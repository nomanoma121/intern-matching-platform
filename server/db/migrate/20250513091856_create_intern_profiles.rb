class CreateInternProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :intern_profiles do |t|
      t.integer :user_id
      t.string :name
      t.string :university
      t.string :grade
      t.text :skills

      t.timestamps
    end
  end
end
