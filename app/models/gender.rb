# == Schema Information
#
# Table name: genders
#
#  id         :bigint(8)        not null, primary key
#  gender     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Gender < ApplicationRecord

  GENDERS = %w(
    Woman
    Man
    Agender
    Androgynous
    Bigender
    Cis\ Man
    Cis\ Woman
    Genderfluid
    Genderqueer
    Gender\ Nonconforming
    Hijra
    Intersex
    Non-binary
    Other
    Pangender
    Transfeminine
    Transgender
    Transmasculine
    Transsexual
    Trans\ Man
    Trans\ Woman
    Two\ Spirit
  )
  
  validates :gender, inclusion: {in: GENDERS}, uniqueness:true

  has_many :users_joins,
    foreign_key: :gender_id,
    class_name: :GendersJoin

  has_many :users,
    through: :users_joins,
    source: :user
end
