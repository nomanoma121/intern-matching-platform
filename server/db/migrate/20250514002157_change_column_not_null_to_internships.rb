class ChangeColumnNotNullToInternships < ActiveRecord::Migration[8.0]
  def change
    change_column_null :internships, :company_id, false
    change_column_null :internships, :title, false
    change_column_null :internships, :description, false
    change_column_null :internships, :period, false
  end
end
