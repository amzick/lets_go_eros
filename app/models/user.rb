# == Schema Information
#
# Table name: users
#
#  id               :bigint(8)        not null, primary key
#  email            :string           not null
#  fname            :string           not null
#  password_digest  :string           not null
#  session_token    :string           not null
#  birthday         :date             not null
#  location         :integer          not null
#  summary          :text
#  height_in_inches :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class User < ApplicationRecord
  
  # TODO bonus: custom email validation, use to send mailers
  validates :email, presence:true, uniqueness:true
  # checking for unique combination of email and fname probably not necessary; want to limit one account per email
  validates :password_digest, :session_token, :birthday, :location, presence:true
  #TODO bonus: custom password validation (include symbols caps numbs, etc)
  validates :password, length: {minimum: 6}, allow_nil:true

  validate :at_least_eighteen
  validate :valid_zip_code
  validate :five_genders_max


  after_initialize :ensure_session_token
  

  
  attr_reader :password

  # assosiations

 
  has_many :genders_joins, dependent: :destroy, inverse_of: :user
  has_many :genders, through: :genders_joins

  has_many :ethnicities_joins, dependent: :destroy, inverse_of: :user
  has_many :ethnicities, through: :ethnicities_joins

  # has_many :ethnicities_joins,
  #   foreign_key: :user_id,
  #   class_name: :EthnicitiesJoin

  # has_many :ethnicities,
  #   through: :ethnicities_joins,
  #   class_name: :Ethnicity
  
  def self.find_by_credentials(email,password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    return nil
  end
  
  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    save!
    self.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  #other functions

  private 

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def at_least_eighteen
    unless self.birthday < ((Date.today << 216)+1)
      self.errors[:birthday] << "must be at least 18 years in the past"
    end
  end

  def five_genders_max
    unless self.genders.length < 6
      self.errors[:genders] << "selected can't exceed five."
    end
  end

  def valid_zip_code
    # TODO: actually check the maps API to make sure zipcode exists... :/
    unless self.location.to_s.length == 5
      self.errors[:location] << "must be a valid zip code"
    end
  end

end
