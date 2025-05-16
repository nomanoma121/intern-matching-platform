class AddIntroductionToInternProfiles < ActiveRecord::Migration[8.0]
  def change
    add_column :intern_profiles, :introduction, :text
  end
end
