# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

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

# Demo User
User.create!(
  email: "demoUser",
  password: "pa$$word",
  fname: "Demi",
  birthday: Date.new(1989,9,12),
  location: 11216,
  genders: [Gender.find_by(gender:"Agender"),Gender.find_by(gender:"Two Spirit")],
  ethnicities: [Ethnicity.find_by(ethnicity:"Asian"),Ethnicity.find_by(ethnicity:"Indian")]
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
LA_ZIPS=(90001..90021).to_a+(90026..90039).to_a+(90052..90072).to_a
# come up with different LA zips

# 50 in new york, 50 in la, 100 random
200.times do |idx|

  if idx < 100 && idx.even?
    zip_code = NEW_YORK_ZIPS.sample
  elsif idx < 100
    zip_code = LA_ZIPS.sample
  else
    zip_code = Faker::Address.zip[0..4]
  end

  User.create!(
    email: Faker::Twitter.unique.screen_name,
    password: "hunter2",
    fname: Faker::Name.first_name,
    genders: gender_picker,
    ethnicities: ethnicity_picker,
    birthday: Faker::Date.birthday(19,65),
    location: zip_code
  )
end

