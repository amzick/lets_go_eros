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