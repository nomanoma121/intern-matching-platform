class ChangeColumnNotNullToInternProfiles < ActiveRecord::Migration[8.0]
  def change
    change_column_null :intern_profiles, :user_id, false
    change_column_null :intern_profiles, :name, false
    change_column_null :intern_profiles, :university, false
    change_column_null :intern_profiles, :grade, false
    change_column_null :intern_profiles, :skills, false
  end
end
