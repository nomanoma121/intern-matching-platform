class Api::AuthController < ApplicationController
  before_action :authenticate, only: %i[me]
  
  def signup
    @user = User.new(user_params)
    if @user.save
      render json: {user: {display_id: @user.display_id, email: @user.email, role: @user.role}}
    else
      render json: {errors: {body: @user.errors}}, status: :unprocessable_entity
    end
  end

  def login
    @user = User.find_by_email(params[:user][:email])
    if @user&.authenticate(params[:user][:password])
      token = create_token(@user.id)
      render json: {user: {token: token, display_id: @user.display_id}}
    else
      render status: :unauthorized
    end
  end

  def me
    @user = User.find_by(id: current_user.id)
    if @user
      render json: {user: { display_id: @user.display_id }}
    else
      render status: :unauthorized
    end
  end

  private

 def user_params
   params.require(:user).permit(:display_id, :email, :password, :role)
 end
end
