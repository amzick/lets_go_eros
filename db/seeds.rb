# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Heart.destroy_all
Message.destroy_all
User.destroy_all
Gender.destroy_all
Ethnicity.destroy_all
Category.destroy_all
Question.destroy_all

Faker::Twitter.unique.clear

Gender.create!([
  {gender: "Woman"},
  {gender: "Man"},
  {gender: "Agender"},
  {gender: "Androgynous"},
  {gender: "Bigender"},
  {gender: "Cis Man"},
  {gender: "Cis Woman"},
  {gender: "Genderfluid"},
  {gender: "Genderqueer"},
  {gender: "Gender Nonconforming"},
  {gender: "Hijra"},
  {gender: "Intersex"},
  {gender: "Non-binary"},
  {gender: "Other"},
  {gender: "Pangender"},
  {gender: "Transfeminine"},
  {gender: "Transgender"},
  {gender: "Transmasculine"},
  {gender: "Transsexual"},
  {gender: "Trans Man"},
  {gender: "Trans Woman"},
  {gender: "Two Spirit"}
])

Ethnicity.create!([
  {ethnicity: "Asian"},
  {ethnicity: "Black"},
  {ethnicity: "Hispanic / Latin"},
  {ethnicity: "Indian"},
  {ethnicity: "Middle Eastern"},
  {ethnicity: "Native American"},
  {ethnicity: "Pacific Islander"},
  {ethnicity: "White"},
  {ethnicity: "Other"},
])

# question is based off of this open source psychometrics project
#  https://openpsychometrics.org/tests/IPIP-BFFM/
# categories: extroversion, agreeableness, conscientiousness
# neuroticism, #openness to experience

Category.create!([
  {category: "E"},
  {category: "A"},
  {category: "C"},
  {category: "N"},
  {category: "O"},
])

EXTROVERSION_QUESTIONS = [
  "am quiet around strangers.",
  "don't mind being the center of attention.",
  "don't like to draw attention to myself.",
  "talk to a lot of different people at parties.",
  "have little to say.",
  "start conversations.",
  "keep in the background.",
  "feel comfortable around people.",
  "don't talk a lot.",
  "am the life of the party!"
]

EXTROVERSION_QUESTIONS.each.with_index do |question,idx|
  unless question == "--"
    category = Category.find_by(category:"E")
    inversion = idx.even? ? true : false
    Question.create!(
      question: question,
      inversion: inversion,
      category_id: category.id
    )
  end
end

AGREEABLENESS_QUESTIONS = [
  "feel little concern for others.",
  "am interested in people.",
  "insult people.",
  "sympathize with others' feelings.",
  "am not interested in other people's problems.",
  "have a soft heart.",
  "am not really interested in others.",
  "take time out for others.",
  "--",
  "feel others' emotions.",
  "--",
  "make people feel at ease."
]

AGREEABLENESS_QUESTIONS.each.with_index do |question,idx|
  unless question == "--"
    category = Category.find_by(category:"A")
    inversion = idx.even? ? true : false
    Question.create!(
      question: question,
      inversion: inversion,
      category_id: category.id
    )
  end
end

CONSCIENTIOUSNESS_QUESTIONS = [
  "--",
  "am exacting in my work.",
  "--",
  "follow a schedule.",
  "shirk my duties.",
  "like order.",
  "often forget to put things back in their proper place.",
  "get chores done right away.",
  "make a mess of things.",
  "pay attention to details.",
  "leave my belongings around.",
  "am always prepared."
]

CONSCIENTIOUSNESS_QUESTIONS.each.with_index do |question,idx|
  unless question == "--"
    category = Category.find_by(category:"C")
    inversion = idx.even? ? true : false
    Question.create!(
      question: question,
      inversion: inversion,
      category_id: category.id
    )
  end
end

NEUROTICISM_QUESTIONS = [
  "get stressed out easily.",
  "am relaxed most of the time.",
  "worry about things.",
  "seldom feel blue.",
  "am easily disturbed.",
  "--",
  "get upset easily.",
  "--",
  "change my mood a lot.",
  "--",
  "have frequent mood swings.",
  "--",
  "get irritated easily.",
  "--",
  "am often blue."
]


NEUROTICISM_QUESTIONS.each.with_index do |question,idx|
  unless question == "--"
  category = Category.find_by(category:"N")
  inversion = idx.even? ? true : false
  Question.create!(
    question: question,
    inversion: inversion,
    category_id: category.id
  )
  end
end

OPENNESS_QUESTIONS = [
  "--",
  "am full of ideas.",
  "--",
  "spend time reflecting on things.",
  "--",
  "use difficult words.",
  "--",
  "am quick to understand things.",
  "do not have a good imagination.",
  "have excellent ideas.",
  "am not interested in abstract ideas.",
  "have a vivid imagination",
  "have difficulty understanding abstract ideas.",
  "have a rich vocabulary."
]


OPENNESS_QUESTIONS.each.with_index do |question,idx|
  unless question == "--"
  category = Category.find_by(category:"O")
  inversion = idx.even? ? true : false
  Question.create!(
    question: question,
    inversion: inversion,
    category_id: category.id
  )
  end
end

demi_summary = "Hey! This is the demo account for Aaron Zick's full stack project. My name is Demi. Please click around and enjoy the site. You can contact Aaron with the links at the bottom of the page for more information or to hire him. Please feel free to edit anything after this part of the text! //////////////////////////////////////////////////"

# Demo User
User.create!(
  email: "demoUser",
  password: "pa$$word",
  fname: "Demi",
  birthday: Date.new(1954,10,17),
  location: 10013,
  city: "Manhattan",
  state: "NY",
  genders: [Gender.find_by(gender:"Agender"),Gender.find_by(gender:"Two Spirit")],
  ethnicities: [Ethnicity.find_by(ethnicity:"Asian"),Ethnicity.find_by(ethnicity:"Indian")],
  summary: demi_summary,
  height_in_inches: 62,
  bot_img_src: "https://images-na.ssl-images-amazon.com/images/I/51iKj+F0qkL.jpg"
)

def aaron_summary 
  "29 year old programmer in New York City. This is my app. You found me!"
end
#demonstrate email
User.create!(
  email: "aaron.zick@gmail.com",
  password: "password",
  fname: "Aaron",
  birthday: Date.new(1989,9,12),
  location: 11216,
  city: "Brooklyn",
  state: "NY",
  genders: [Gender.find_by(gender:"Man")],
  ethnicities: [Ethnicity.find_by(ethnicity:"White"), Ethnicity.find_by(ethnicity:"Black")],
  summary: aaron_summary,
  height_in_inches: 70,
  bot_img_src: "https://s3.amazonaws.com/letsgoeros-dev/vfs_ID.jpg"
)



# function to return a unique array of valid genders
def gender_picker
  all_genders = Gender.all.shuffle
  result = []
  rand(1..5).times do
    result << all_genders.pop
  end
  return result
end
# function to return a unique array of valid races
def ethnicity_picker
  all_ethnicities = Ethnicity.all.shuffle
  result = []
  rand(1..3).times do
    result << all_ethnicities.pop
  end
  return result
end

# come up with different New York zips
NEW_YORK_ZIPS=(10001..10041).to_a+(10301..10314).to_a+(10451..10475).to_a+(11101..11106).to_a+(11201..11245).to_a
# come up with different LA zips
LA_ZIPS=(90001..90021).to_a+(90026..90039).to_a+(90052..90072).to_a

def summary_maker
  (Faker::BojackHorseman.quote + " " + Faker::Book.title + " " +  Faker::BojackHorseman.tongue_twister +  " " +  Faker::Company.industry +  " " +  Faker::Company.profession +  " " +  Faker::Dessert.variety +  " " +  Faker::Educator.university +  " " +  Faker::Educator.course +  " " +  Faker::Esport.game +  " " +  Faker::Hipster.paragraph +  " " +  Faker::Music.band +  " " +  Faker::Music.album)
end

# height along a gaussian curve using ruby stats
# https://stackoverflow.com/questions/5825680/code-to-generate-gaussian-normally-distributed-random-numbers-in-ruby
# http://www.usablestats.com/lessons/normal

height_gaussian = Rubystats::NormalDistribution.new(68,4)

BOT_IMAGES = ["https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-200w.jpeg", "https://tinyfac.es/data/avatars/E0B4CAB3-F491-4322-BEF2-208B46748D4A-200w.jpeg", "https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-200w.jpeg", "https://tinyfac.es/data/avatars/BA0CB1F2-8C79-4376-B13B-DD5FB8772537-200w.jpeg", "https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-200w.jpeg", "https://tinyfac.es/data/avatars/B3CF5288-34B0-4A5E-9877-5965522529D6-200w.jpeg", "https://tinyfac.es/data/avatars/2DDDE973-40EC-4004-ABC0-73FD4CD6D042-200w.jpeg", "https://tinyfac.es/data/avatars/A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-200w.jpeg", "https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-200w.jpeg", "https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-200w.jpeg", "https://tinyfac.es/data/avatars/344CFC24-61FB-426C-B3D1-CAD5BCBD3209-200w.jpeg", "https://tinyfac.es/data/avatars/282A12CA-E0D7-4011-8BDD-1FAFAAB035F7-200w.jpeg", "https://tinyfac.es/data/avatars/AEF44435-B547-4B84-A2AE-887DFAEE6DDF-200w.jpeg"]

100.times do |idx| 
  BOT_IMAGES.push("https://randomuser.me/api/portraits/women/#{idx}.jpg")
  BOT_IMAGES.push("https://randomuser.me/api/portraits/men/#{idx}.jpg")
end


# 100 in new york, 100 in la
200.times do |idx|

  if idx.even?
    zip_code = NEW_YORK_ZIPS.sample
    city = ["New York City", "Manhattan", "Bronx", "Brooklyn", "Staten Island"].sample
    state = "NY"
  else
    zip_code = LA_ZIPS.sample
    city = "Los Angeles"
    state = "CA"
  # I took this out because now that I'm trying to selecively show results from nearby users, there wasn't much point in doing this
  # else
  #   zip_code = Faker::Address.zip[0..4]
  #   city = Faker::Address.city
  #   state = Faker::Address.state_abbr  
  end

  User.create!(
    email: Faker::Twitter.unique.screen_name,
    password: "hunter2",
    fname: Faker::Name.first_name,
    genders: gender_picker,
    ethnicities: ethnicity_picker,
    birthday: Faker::Date.birthday(19,65),
    location: zip_code,
    city: city,
    state: state,
    summary: summary_maker,
    height_in_inches: height_gaussian.rng,
    bot_img_src: BOT_IMAGES.sample
  )
end

User.all.each do |user|
  user.answer_n_questions(rand(10..40))
end

User.create!(
  email: "aaron_zick@yahoo.com",
  password: "password",
  fname: "You...",
  birthday: Date.new(1989,9,12),
  location: "07663",
  city: "Saddle Brook",
  state: "NJ",
  genders: [Gender.find_by(gender:"Man")],
  ethnicities: [Ethnicity.find_by(ethnicity:"White"), Ethnicity.find_by(ethnicity:"Black")],
  summary: "Compare me to my enemy 'That Guy' she tells you not to worry about!",
  height_in_inches: 70,
  bot_img_src: "https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/003/223/medium/DSC00356.JPG?1543343086"
  )

Question.all.each do |question|
  Response.create(question_id:question.id, user_id: User.last.id, response:0)
end

User.create!(
  email: "that_guy@aol.com",
  password:"password",
  fname: "...That Guy",
  birthday: Date.new(1989,9,12),
  location: "11201",
  city: "Brooklyn",z
  state: "NY",
  genders: [Gender.find_by(gender:"Man")],
  ethnicities: [Ethnicity.find_by(ethnicity:"White"), Ethnicity.find_by(ethnicity:"Black")],
  summary: "There's a bizarro version of me floating around here somewhere...",
  height_in_inches: 70,
  bot_img_src: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/32802194_10211994145797503_7284711747485696000_n.jpg?_nc_cat=107&_nc_ht=scontent-lga3-1.xx&oh=ce8b1070a9420b50b17d51a85386686f&oe=5CBBD356"
)

Question.all.each do |question|
  Response.create(question_id:question.id, user_id: User.last.id, response:4)
end

Heart.create({admirer: User.second, crush: User.third})
Heart.create({admirer: User.first, crush: User.second})
Heart.create({admirer: User.second_to_last, crush: User.first})
Heart.create({admirer: User.first, crush: User.last})