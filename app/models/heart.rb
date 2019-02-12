# == Schema Information
#
# Table name: hearts
#
#  id         :bigint(8)        not null, primary key
#  admirer_id :integer          not null
#  crush_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Heart < ApplicationRecord
  validates :admirer, :crush, presence:true

  belongs_to :admirer,
    foreign_key: :admirer_id,
    class_name: :User

  belongs_to :crush,
    foreign_key: :crush_id,
    class_name: :User
end
