class ChangeColumnNotNullToUsers < ActiveRecord::Migration[8.0]
  def change
    change_column_null :users, :email, false
    change_column_null :users, :password_digest, false
    change_column_null :users, :display_id, false
    change_column_null :users, :role, false
  end
end
