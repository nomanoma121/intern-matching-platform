class User < ApplicationRecord
  has_secure_password
  has_one :company_profile, dependent: :destroy
  has_one :intern_profile, dependent: :destroy

  validates :display_id, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :role, presence: true
end
