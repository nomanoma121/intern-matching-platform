class AddForeignKeyToMessages < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :messages, :users, column: :sender_id 
    add_foreign_key :messages, :users, column: :receiver_id
  end
end
