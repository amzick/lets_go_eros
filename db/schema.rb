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

ActiveRecord::Schema.define(version: 2019_01_27_024003) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "category", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category"], name: "index_categories_on_category", unique: true
  end

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

  create_table "questions", force: :cascade do |t|
    t.string "question", null: false
    t.boolean "inversion", default: false, null: false
    t.integer "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "responses", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "question_id", null: false
    t.integer "response", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "question_id"], name: "index_responses_on_user_id_and_question_id"
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
