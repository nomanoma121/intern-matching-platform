class AddDescriptionToInternProfiles < ActiveRecord::Migration[8.0]
  def change
    add_column :intern_profiles, :description, :text
  end
end
