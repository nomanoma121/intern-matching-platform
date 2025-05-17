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
        intern_data.merge!(
          profile.as_json(
            only: [
              :university,
              :grade,
              :skills,
              :name,
              :introduction,
              :description 
            ] 
          )
        )
      end

      render json: intern_data
    else
      render json: { error: "Intern not found" }, status: :not_found
    end
  end

  def index
    # internsの一覧
    @interns = User.includes(:intern_profile).where(role: "INTERN")
    interns_data = @interns.map do |user|
      profile = user.intern_profile

      intern_data = {
        display_id: user.display_id,
        email: user.email
      }

      if profile
        intern_data.merge!(
          profile.as_json(
            only: [
              :university,
              :grade,
              :skills,
              :name,
              :introduction,
              :description
            ]
          )
        )
      end

      intern_data
    end
    render json: interns_data
  end

end
