# == Schema Information
#
# Table name: responses
#
#  id          :bigint(8)        not null, primary key
#  user_id     :integer          not null
#  question_id :integer          not null
#  response    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Response < ApplicationRecord

  validates :user, :question, :response, presence:true
  validates :question_id, uniqueness: {scope: :user_id}

  belongs_to :user
  belongs_to :question
  has_one :category, through: :question

end
