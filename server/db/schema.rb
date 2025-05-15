# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_05_14_014453) do
  create_table "company_profiles", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "company_name", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "intern_profiles", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name", null: false
    t.string "university", null: false
    t.string "grade", null: false
    t.text "skills", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "internships", force: :cascade do |t|
    t.integer "company_id", null: false
    t.string "title", null: false
    t.text "description", null: false
    t.string "period", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.integer "sender_id", null: false
    t.integer "receiver_id", null: false
    t.text "content", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "display_id", null: false
    t.string "role", null: false
    t.index ["display_id"], name: "index_users_on_display_id", unique: true
  end

  add_foreign_key "company_profiles", "users"
  add_foreign_key "intern_profiles", "users"
  add_foreign_key "internships", "users", column: "company_id"
  add_foreign_key "messages", "users", column: "receiver_id"
  add_foreign_key "messages", "users", column: "sender_id"
end
