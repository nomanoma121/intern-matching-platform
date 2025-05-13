class AddDisplayIdAndRoleToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :display_id, :string
    add_column :users, :role, :string
  end
end
