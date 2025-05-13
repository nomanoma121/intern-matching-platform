class AddForeignKeyToInternProfiles < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :intern_profiles, :users
  end
end
