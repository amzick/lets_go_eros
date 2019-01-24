# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190124151136) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ethnicities", force: :cascade do |t|
    t.string "ethnicity", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ethnicities_joins", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "ethnicity_id", null: false
    t.index ["user_id", "ethnicity_id"], name: "index_ethnicities_joins_on_user_id_and_ethnicity_id"
  end

  create_table "genders", force: :cascade do |t|
    t.string "gender", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "genders_joins", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "gender_id", null: false
    t.index ["user_id", "gender_id"], name: "index_genders_joins_on_user_id_and_gender_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "fname", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.date "birthday", null: false
    t.integer "location", null: false
    t.text "summary"
    t.integer "height_in_inches"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "fname", "location"], name: "index_users_on_email_and_fname_and_location"
  end

end
