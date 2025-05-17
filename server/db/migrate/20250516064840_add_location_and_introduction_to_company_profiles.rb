class AddLocationAndIntroductionToCompanyProfiles < ActiveRecord::Migration[8.0]
  def change
    add_column :company_profiles, :location, :string
    add_column :company_profiles, :introduction, :text
  end
end
