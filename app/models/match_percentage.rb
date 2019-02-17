# == Schema Information
#
# Table name: match_percentages
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  match_id   :integer          not null
#  percentage :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class MatchPercentage < ApplicationRecord
  validates :user, presence: true, uniqueness: {scope: :match_id}
  validates :match, presence: true, uniqueness: {scope: :user_id}
  validates :percentage, presence: true, inclusion: {in: (0..100)}

  belongs_to :user

  belongs_to :match,
    foreign_key: :match_id,
    class_name: :User
    
end
