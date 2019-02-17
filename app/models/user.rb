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
#  bot_img_src      :string
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

  has_many :sent_messages,
    foreign_key: :sender_id,
    class_name: :Message

  has_many :received_messages,
    foreign_key: :recipient_id,
    class_name: :Message

  # logic is inverted here. if someone admirers a user, the user is the crush
  #  if the user has a crush on someone the user is the admirer
  has_many :received_hearts,
    foreign_key: :crush_id,
    class_name: :Heart

  has_many :sent_hearts,
    foreign_key: :admirer_id,
    class_name: :Heart

  has_many :admirers,
    through: :received_hearts,
    source: :admirer

  has_many :crushes,
    through: :sent_hearts,
    source: :crush

  has_many :match_percentages

  # the inverse
  has_many :matchee_percentages,
    foreign_key: :match,
    class_name: :MatchPercentage

  # return an array of all users user is messaging with
  def is_messaging_with
    result = Array.new
    Message.select(:sender_id,:recipient_id)
    .where("messages.sender_id = ? OR messages.recipient_id = ?", self.id, self.id)
    .map do |message|
      result << message.sender_id if message.sender_id != self.id
      result << message.recipient_id if message.recipient_id != self.id
    end    
    
    result.uniq.flatten
  end

  def all_messages_with(user)
    Message.select(:id)
    .where("messages.sender_id = ? OR messages.recipient_id = ?", user.id, user.id)
    .order('messages.created_at DESC')
  end
    # aws
  has_many_attached :profile_pictures
  

    
    # ************   MATCH MATH /////////////////

=begin
select questions.id from questions left join responses on responses
.question_id = questions.id 
WHERE responses.user_id !=  1295 OR responses.user_id IS NULL group by questions.id;
via https://stackoverflow.com/questions/19682816/sql-statement-select-the-inverse-of-this-query

using active record to nest queries:
https://stackoverflow.com/questions/10147289/rails-nested-sql-queries

 # def unanswered_questions
    the original sql method that doesn't work in rails because execute doesn't like nested queries
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

  def unanswered_questions
    # this ended up not working
    # Question.select(:id)
    # .left_outer_joins(:responses)
    # .where("responses.user_id != ? OR responses.user_id IS NULL", self.id)
    # .group(:id)
    # was looking into nested sql queries using active record, and just realized the solution was super simple:
    Question.select("*").where.not(id: self.answered_questions)
  end

  def answer_n_questions(n = 1)
    return nil if self.unanswered_questions.empty?
    n.times do
      Response.create(question:self.unanswered_questions.sample,user:self,response:rand(0..4))
    end
  end

  def reset_questions!
    self.responses.destroy_all
  end

=begin  # in order to compare questions that aren't mutually answered by two users, this funciton
  assigns a general score to each category, mapped 0 to 1. we can then compare these general scores to other users
=end


  def category_scores
    questions_hash = Hash.new
    Category.all.each {|category| questions_hash[category.category] = Array.new}
    results = Hash.new

    self.responses.includes(:category).each do |response|
      questions_hash[response.category.category] << response.response
    end
    questions_hash.each do |category, responses|
      if responses.empty?
        results[category] = 0.5
      else
        results[category] = responses.inject(&:+).to_f/(responses.length * 4).to_f
      end
    end
    results
  end

  def category_diffs(match)
    user_scores = self.category_scores
    match_scores = match.category_scores
    result = []
    Category.all.each do |category|
      result << (user_scores[category.category] - match_scores[category.category]).abs
    end
    result
  end

=begin
  now we will weigh the mutually answered responses equally (tbd) with the answered questions
=end

  # mutually answered questions difference
  def maq_diffs(match)
    # avoiding n+1 queries. increases spacial complexity with the hashes, but there will be way more total responses on the database than one user could have
    result = []
    maqs = Question.select(:id).where(id: self.answered_questions).where(id: match.answered_questions).includes(:responses)
    user_responses = Hash.new
    Response.select(:question_id, :response).where(id: self.responses).map{|response| user_responses[response.question_id] = response.response}
    match_responses = Hash.new
    Response.select(:question_id, :response).where(id: match.responses).map{|response| match_responses[response.question_id] = response.response}
    maqs.each do |question|    
      # p leaving this in case I ever want to measure time difference
      # result << ( Response.find_by(question:question,user:self).response - Response.find_by(question:question, user: match).response).abs
      result << (user_responses[question.id] - match_responses[question.id]).abs
    end
    result
  end

  def calculate_match_percentage(match)
    category_comparison = 100.0
    category_array = self.category_diffs(match)
    category_array.each {|el| category_comparison -= ((100.0/category_array.length)*el)}
    
    
    maq_array = self.maq_diffs(match)
    if maq_array.length.zero?
      maq_comparison = 0.5
    else
      maq_comparison = 100.0 - ( (100.0/maq_array.length) * (1.0/(Category.all.length)) * maq_array.inject(&:+).to_f)
    end
    
    #if more weighted comparisons added (ie love languages) don't forget to update the scales!
    scale = 0.5
    (scale * (category_comparison + maq_comparison)).floor
    
  end
  
  def match_percentage(match)

    # 1. check the database if the relation already exists, save as a variable.
    match_percentage = MatchPercentage.find_by(user:self,match:match)
    if match_percentage.nil?
      # 3. if not, calculate it, store it, return it
      percentage = self.calculate_match_percentage(match)
      match_percentage = MatchPercentage.create!({user:self,match:match,percentage: percentage})
      match_percentage.percentage   
    else
      # could be that neither user has responded to a problem
      if self.responses.empty? || match.responses.empty?
        # don't recalculate
        match_percentage.percentage
      else
        # if either user has a response less than a day old, recalculate
        # I added the second condition so that if a user is active and answering a lot of questions, its not going to recalculate the response that frequently; only after 5 minutes
        if (match_percentage.updated_at < (Time.now.utc - (5*60))) && (self.responses.last.updated_at >= Date.today || match.responses.last.updated_at >= Date.today) 
          percentage = self.calculate_match_percentage(match)
          match_percentage.update!({user:self, match:match, percentage: percentage})
          match_percentage.percentage
        else
          match_percentage.percentage
        end
      end
    end
  end

 
  # radius is the difference of zip codes to include. so as a user with a zip of 11516, this would return users from
  #  11016 to 12016
  def nearby_user_ids(max_result_size = 40, radius = 500)
    # since the numbers are saved as strings in the DB, had to be a little creative to compare them
    lower = (self.location.to_i-radius).to_s
    lower.prepend("0") if lower.length < 5
    upper = (self.location.to_i+radius).to_s
    upper.prepend("0") if upper.length < 5
    # selecting IDs using active record was giving me an error, so I mapped it
    User.where(location: (lower..upper) )
    .order("RANDOM()")
    .limit(max_result_size).map {|user| user.id }
  end
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
