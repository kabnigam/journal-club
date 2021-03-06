# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160708165543) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "article_groups", force: :cascade do |t|
    t.integer  "article_id", null: false
    t.integer  "group_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "article_groups", ["article_id"], name: "index_article_groups_on_article_id", using: :btree
  add_index "article_groups", ["group_id"], name: "index_article_groups_on_group_id", using: :btree

  create_table "articles", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "title",       null: false
    t.text     "body",        null: false
    t.string   "source"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "picture_url"
  end

  add_index "articles", ["user_id"], name: "index_stories_on_author_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.text     "body",       null: false
    t.integer  "user_id",    null: false
    t.integer  "article_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float    "ratio"
  end

  add_index "comments", ["article_id"], name: "index_comments_on_article_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "highlights", force: :cascade do |t|
    t.integer  "start_index", null: false
    t.integer  "end_index",   null: false
    t.integer  "user_id",     null: false
    t.integer  "article_id",  null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "highlights", ["article_id"], name: "index_highlights_on_article_id", using: :btree
  add_index "highlights", ["user_id"], name: "index_highlights_on_user_id", using: :btree

  create_table "user_groups", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "group_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "user_groups", ["group_id"], name: "index_user_groups_on_group_id", using: :btree
  add_index "user_groups", ["user_id"], name: "index_user_groups_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "group_id"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
