class AddIndexDisplayIdToUsers < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :display_id, unique: true, name: 'index_users_on_display_id'
  end
end
