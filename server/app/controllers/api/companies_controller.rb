class Api::CompaniesController < ApplicationController
  before_action :authenticate

  def show
    @user = User.includes(:company_profile).find_by(display_id: params[:id])

    if @user
      profile = @user.company_profile

      company_data = {
        display_id: @user.display_id,
        email: @user.email
      }

      if profile
        company_data[:company_profile] = profile.as_json(
          only: [
            :company_name,
            :description,
          ]
        )
      end

      render json: { company: company_data }
    else
      render json: { error: "Company not found" }, status: :not_found
    end
  end
end
