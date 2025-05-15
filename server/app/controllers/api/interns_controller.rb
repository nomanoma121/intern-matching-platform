class Api::InternsController < ApplicationController
  before_action :authenticate, only: %i[show]

  def show
    @user = User.includes(:intern_profile).find_by(display_id: params[:id])

    if @user
      profile = @user.intern_profile

      intern_data = {
        display_id: @user.display_id,
        email: @user.email
      }

      if profile
        intern_data[:intern_profile] = profile.as_json(
          only: [
            :name,
            :university,
            :skills,
            :grade,
          ]
        )
      end

      render json: { intern: intern_data }
    else
      render json: { error: "Intern not found" }, status: :not_found
    end
  end

end
