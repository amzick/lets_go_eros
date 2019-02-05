# == Schema Information
#
# Table name: messages
#
#  id           :bigint(8)        not null, primary key
#  sender_id    :integer          not null
#  recipient_id :integer          not null
#  unread       :boolean          default(TRUE), not null
#  message      :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Message < ApplicationRecord
  validates :sender_id, :recipient_id, :message, presence:true
  validates :unread, inclusion: {in: [true,false]}
  

  belongs_to :sender,
    foreign_key: :sender_id,
    class_name: :User

  belongs_to :recipient,
    foreign_key: :recipient_id,
    class_name: :User

end
