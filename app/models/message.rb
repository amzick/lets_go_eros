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

  def sent_at
    current_time = Time.zone.now
    if self.created_at.today?
    # if within last hour, return minutes ago (just now if recent)
      if current_time.hour == self.created_at.hour
        minutes_ago = current_time.min - self.created_at.min
        if minutes_ago.zero?
          return "Sent just now!"
        else
          return "Sent #{minutes_ago} minutes ago!"
        end
    # if today not within last hour return hours ago
      else
        hours_ago = current_time.hour - self.created_at.hour
        return "Sent #{hours_ago} hours ago."
      end
    # else return date
    else
      self.created_at.strftime("Sent %b %d, %Y")
    end
  end

end
