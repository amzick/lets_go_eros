# == Schema Information
#
# Table name: questions
#
#  id          :bigint(8)        not null, primary key
#  question    :string           not null
#  inversion   :boolean          default(FALSE), not null
#  category_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Question < ApplicationRecord

  validates :question, presence:true, uniqueness:true
  validates :category_id, presence:true
  validates :inversion, inclusion: {in:[true,false]}

  belongs_to :category
  has_many :responses, dependent: :destroy, inverse_of: :question

end 
