class ChangeColumnNotNullToCompanyProfiles < ActiveRecord::Migration[8.0]
  def change
    change_column_null :company_profiles, :user_id, false
    change_column_null :company_profiles, :company_name, false
    change_column_null :company_profiles, :description, false
  end
end
