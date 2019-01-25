# == Schema Information
#
# Table name: ethnicities_joins
#
#  id           :bigint(8)        not null, primary key
#  user_id      :integer          not null
#  ethnicity_id :integer          not null
#

class EthnicitiesJoin < ApplicationRecord

  validates :user, :ethnicity, presence:true
  validates :ethnicity_id, uniqueness: {scope: :user_id}

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :ethnicity,
    foreign_key: :ethnicity_id,
    class_name: :Ethnicity

end
