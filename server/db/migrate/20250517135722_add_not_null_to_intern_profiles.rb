class AddNotNullToInternProfiles < ActiveRecord::Migration[8.0]
  def change
    change_column_null :intern_profiles, :introduction, false
    change_column_null :intern_profiles, :description, false
  end
end
