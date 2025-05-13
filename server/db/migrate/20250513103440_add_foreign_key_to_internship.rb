class AddForeignKeyToInternship < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :internships, :users, column: :company_id
  end
end
