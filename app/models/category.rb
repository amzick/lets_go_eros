# == Schema Information
#
# Table name: categories
#
#  id         :bigint(8)        not null, primary key
#  category   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Category < ApplicationRecord

    validates :category, presence:true, uniqueness:true

    has_many :questions

end
