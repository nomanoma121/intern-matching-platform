class Api::AuthController < ApplicationController
  before_action :authenticate, only: %i[me]

  def signup
    permitted_user_params = user_params # ユーザーパラメータを一度取得

    ActiveRecord::Base.transaction do
      @user = User.new(permitted_user_params)

      unless @user.save
        render json: { errors: { user: @user.errors.full_messages } }, status: :unprocessable_entity
        raise ActiveRecord::Rollback # トランザクションをロールバック
      end

      profile = nil
      if @user.role == "COMPANY"
        profile_attributes = company_profile_params.to_h
        profile_attributes[:description] = profile_attributes.delete(:company_description) if profile_attributes.key?(:company_description)
        profile = @user.build_company_profile(profile_attributes)
      elsif @user.role == "INTERN"
        intern_attributes = intern_profile_params.to_h # Strong Parameters をハッシュに変換
        intern_attributes[:name] = @user.display_id     # name を設定
        profile = @user.build_intern_profile(intern_attributes)
      else
        # 不正なロールが指定された場合 (Userモデルのバリデーションで先に捕捉される可能性が高い)
        render json: { errors: { role: ["Invalid role specified"] } }, status: :unprocessable_entity
        raise ActiveRecord::Rollback
      end

      # profile が nil (不正なロールなど) または保存に失敗した場合
      unless profile&.save
        error_messages = profile ? profile.errors.full_messages : ["Profile could not be created due to invalid role or other issues."]
        render json: { errors: { profile: error_messages } }, status: :unprocessable_entity
        raise ActiveRecord::Rollback # トランザクションをロールバック
      end

      # 成功時の処理
      token = create_token(@user.id)
      user_data_response = { token: token, display_id: @user.display_id, email: @user.email, role: @user.role }
      if @user.role == "COMPANY"
        user_data_response[:company_profile] = profile.as_json
      elsif @user.role == "INTERN"
        user_data_response[:intern_profile] = profile.as_json
      end
      render json: { user: user_data_response }, status: :created
    end
  # rescue ActiveRecord::Rollback は明示的にキャッチする必要はありません。
  # トランザクションブロックがロールバックを処理し、例外は再発生しません。
  # 他の予期せぬエラーを捕捉したい場合は、ここに rescue StandardError => e ... を追加できます。
  end

  def login
    @user = User.find_by_email(params[:user][:email])
    if @user&.authenticate(params[:user][:password])
      token = create_token(@user.id)
      render json: {user: {token: token, display_id: @user.display_id, email: @user.email, role: @user.role}} # roleも返すように修正
    else
      render status: :unauthorized
    end
  end

  def me
    @user = User.find_by(id: current_user.id)
    if @user
      user_data = { display_id: @user.display_id, email: @user.email, role: @user.role }
      if @user.company_profile
        user_data[:company_profile] = @user.company_profile
      elsif @user.intern_profile
        user_data[:intern_profile] = @user.intern_profile
      end
      render json: {user: user_data }
    else
      render status: :unauthorized
    end
  end

  private

  # ユーザー登録時の共通パラメータ（roleも含む）
  def user_params
    params.require(:user).permit(:display_id, :email, :password, :role)
  end

  # 企業プロファイル用のパラメータ
  def company_profile_params
    params.require(:user).permit(:company_name, :company_description)
  end

  # 学生プロファイル用のパラメータ
  def intern_profile_params
    # name はコントローラーで別途設定するため、ここでは permit しない
    params.require(:user).permit(:university, :grade, :skills)
  end
end
