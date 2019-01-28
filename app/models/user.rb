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
  # include Rails.application.routes.url_helpers
  
  # TODO bonus: custom email validation, use to send mailers
  validates :email, presence:true, uniqueness:true
  # checking for unique combination of email and fname probably not necessary; want to limit one account per email
  validates :password_digest, :session_token, :birthday, :location, presence:true
  #TODO bonus: custom password validation (include symbols caps numbs, etc)
  validates :password, length: {minimum: 6}, allow_nil:true
  validates :fname, length: {maximum:15}

  validate :at_least_eighteen
  validate :valid_zip_code
  # validate :max_five_genders


  after_initialize :ensure_session_token
  

  
  attr_reader :password

  # assosiations

 
  has_many :genders_joins, dependent: :destroy, inverse_of: :user
  has_many :genders, through: :genders_joins
  validates :genders, length:{maximum:5}

  has_many :ethnicities_joins, dependent: :destroy, inverse_of: :user
  has_many :ethnicities, through: :ethnicities_joins

  has_many :responses, dependent: :destroy, inverse_of: :user

  # TODO AWS: 
  has_many_attached :profile_pictures
  has_one_attached :thing

  # https://stackoverflow.com/questions/4804591/rails-activerecord-validate-single-attribute
  def valid_attribute?(attribute_name)
    self.valid?
    self.errors[attribute_name].empty?
  end
  

  # helper function returning an array of the profile_picture URLs? pictures urls?
  # not needed - handled in jbuilder
  # def pictureURLs
  #   self.profile_pictures.map {|picture| url_for(picture)}
  # end
  
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
    return false if self.birthday.nil?

    unless self.birthday < ((Date.today << 216)+1)
      self.errors[:birthday] << "You must be at least 18 years old to sign up!"
    end
  end

  protected

  # def max_five_genders
  #   unless self.genders.length < 6
  #     self.errors[:genders] << ["Please limit selected genders to five."]
  #   end
  # end

  def valid_zip_code
    # TODO: actually check the maps API to make sure zipcode exists... :/

    unless self.location.to_s.length == 5
      console.log(self.location)
      self.errors[:location] << "Zip Codes must be five digits"
    end
  end

end
