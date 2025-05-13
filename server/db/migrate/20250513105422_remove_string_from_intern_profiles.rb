class RemoveStringFromInternProfiles < ActiveRecord::Migration[8.0]
  def change
    remove_column :intern_profiles, :string, :string
  end
end
