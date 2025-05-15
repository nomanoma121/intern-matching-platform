class InternProfile < ApplicationRecord
  belongs_to :user
  validates :university, presence: true
  validates :grade, presence: true
  validates :skills, presence: true
end
