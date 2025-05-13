class AddForeignKeyToCompanyProfiles < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :company_profiles, :users
  end
end
