class ChangeColumnNotNullToMessages < ActiveRecord::Migration[8.0]
  def change
    change_column_null :messages, :sender_id, false
    change_column_null :messages, :receiver_id, false
    change_column_null :messages, :content, false
  end
end
