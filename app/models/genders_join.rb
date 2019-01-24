# == Schema Information
#
# Table name: genders_joins
#
#  id        :bigint(8)        not null, primary key
#  user_id   :integer          not null
#  gender_id :integer          not null
#

class GendersJoin < ApplicationRecord
  validates :user, :gender, presence:true
  validates :gender_id, uniqueness: {scope: :user_id}

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :gender,
    foreign_key: :gender_id,
    class_name: :Gender

end
