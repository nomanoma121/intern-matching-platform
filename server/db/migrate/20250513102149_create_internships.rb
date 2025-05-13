class CreateInternships < ActiveRecord::Migration[8.0]
  def change
    create_table :internships do |t|
      t.integer :company_id
      t.string :title
      t.text :description
      t.string :period

      t.timestamps
    end
  end
end
