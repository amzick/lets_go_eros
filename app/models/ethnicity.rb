# == Schema Information
#
# Table name: ethnicities
#
#  id         :bigint(8)        not null, primary key
#  ethnicity  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Ethnicity < ApplicationRecord

  ETHNICITIES = %w(
    Asian
    Black
    Hispanic\ /\ Latin
    Indian
    Middle\ Eastern
    Native\ American
    Pacific\ Islander
    White
    Other
  )

  validates :ethnicity, inclusion: {in: ETHNICITIES}, uniqueness:true

  has_many :users_joins,
    foreign_key: :ethnicity_id,
    class_name: :EthnicitiesJoin
  
  has_many :users,
    through: :users_joins,
    source: :user 


end
