class CreateCompanyProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :company_profiles do |t|
      t.integer :user_id
      t.string :company_name
      t.text :description

      t.timestamps
    end
  end
end
