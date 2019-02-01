# require_relative 'question'
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
#  location         :string           not null
#  summary          :text
#  height_in_inches :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  city             :string
#  state            :string
#

class User < ApplicationRecord
  
  # TODO bonus: custom email validation, use to send mailers
  validates :email, presence:true, uniqueness:true
  # checking for unique combination of email and fname probably not necessary; want to limit one account per email
  validates :password_digest, :session_token, :birthday, :location, presence:true
  #TODO bonus: custom password validation (include symbols caps numbs, etc)
  validates :password, length: {minimum: 6}, allow_nil:true
  validates :fname, length: {maximum:13}

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

  has_many :answered_questions,
    through: :responses,
    source: :question

    # TODO AWS: 
  has_many_attached :profile_pictures
  has_one_attached :thing

    
  def unanswered_questions
    Question.select(:id)
    .left_outer_joins(:responses)
    .where("responses.user_id != ? OR responses.user_id IS NULL", self.id)
    .group(:id)
  end

=begin
select questions.id from questions left join responses on responses
.question_id = questions.id 
WHERE responses.user_id !=  1295 OR responses.user_id IS NULL group by questions.id;

via https://stackoverflow.com/questions/19682816/sql-statement-select-the-inverse-of-this-query
    select *
    from questions
    where id NOT IN (
      select questions.id
      from questions
      left outer join responses on responses.question_id = questions.id
      join users on responses.user_id = users.id
      where users.id = 1295
    );
  
    
 # def unanswered_questions
    
  #   data = ActiveRecord::Base.connection.execute(<<-SQL, self.id)
  #     select 
  #       *
  #     from 
  #       questions
  #     where id NOT IN (
  #       select 
  #         questions.id
  #       from 
  #         questions
  #       left outer join responses on responses.question_id = questions.id
  #       join users on responses.user_id = users.id
  #       where users.id = ? 
  #       ) 
  #   SQL
  #   data.map {|datum| Question.new(datum)}
  # end
=end


  

  # https://stackoverflow.com/questions/4804591/rails-activerecord-validate-single-attribute
  def valid_attribute?(attribute_name)
    self.valid?
    self.errors[attribute_name].empty?
  end
  
  # ************   MATCH MATH /////////////////
  def random_match_percentage
    rand(0..100)
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

  #other functions///////////////////////////////////////////


  # https://stackoverflow.com/questions/819263/get-persons-age-in-ruby
  def age
    result = Date.today.year - birthday.year
    result -= 1 if Date.today < birthday + result.years
    result
  end

  def height
    return nil if self.height_in_inches.nil?
    feet = self.height_in_inches / 12
    inches = self.height_in_inches % 12
    return inches.zero? ? "#{feet}\'"  : "#{feet}\' #{inches}\""
  end

  def astrology_sign
    month = birthday.month
    day = birthday.day
    if (month == 3 && day >= 21) || (month==4 && day <= 19 )
      "Aries" 
    elsif (month == 4 && day >= 20) || (month==5 && day <= 20 )
      "Taurus" 
    elsif (month == 5 && day >= 21) || (month==6 && day <= 20 )
      "Gemini" 
    elsif (month == 6 && day >= 21) || (month==7 && day <= 22 )
      "Cancer" 
    elsif (month == 7 && day >= 23) || (month==8 && day <= 22 )
      "Leo" 
    elsif (month == 8 && day >= 23) || (month==9 && day <= 22 )
      "Virgo" 
    elsif (month == 9 && day >= 23) || (month==10 && day <= 22 )
      "Libra" 
    elsif (month == 10 && day >= 23) || (month==11 && day <= 21 )
      "Scorpio" 
    elsif (month == 11 && day >= 22) || (month==12 && day <= 21 )
      "Sagittarius" 
    elsif (month == 12 && day >= 22) || (month==1 && day <= 19 )
      "Capricorn" 
    elsif (month == 1 && day >= 20) || (month==2 && day <= 18 )
      "Aquarius" 
    elsif (month == 2 && day >= 19) || (month==3 && day <= 20 )
      "Pisces" 
    end
    
  end

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
      
      self.errors[:location] << "Zip Codes must be five digits"
    end
  end

end
