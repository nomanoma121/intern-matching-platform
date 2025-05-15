class CompanyProfile < ApplicationRecord
  belongs_to :user
  validates :company_name, presence: true
  # 必要であれば company_description にもバリデーションを追加
  # validates :company_description, presence: true
end
