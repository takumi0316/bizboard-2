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

ActiveRecord::Schema.define(version: 2017_07_29_074819) do

  create_table "active_storage_attachments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "companies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.string "kana"
    t.integer "title", limit: 1, default: 0
    t.text "note"
  end

  create_table "company_unit_clients", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "company_unit_id"
    t.bigint "user_id"
    t.string "name"
    t.string "kana"
    t.integer "title", limit: 1, default: 0
    t.string "tel"
    t.string "email"
    t.text "note"
    t.index ["company_unit_id"], name: "index_company_unit_clients_on_company_unit_id"
    t.index ["user_id"], name: "index_company_unit_clients_on_user_id"
  end

  create_table "company_units", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.string "kana"
    t.integer "title", limit: 1, default: 0
    t.string "zip"
    t.string "prefecture"
    t.string "address1"
    t.string "sddress2"
    t.text "note"
  end

  create_table "invoice_binds", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "invoice_id"
    t.integer "posting_state", default: 0
    t.integer "print_size", limit: 1, default: 0
    t.text "print_size_note"
    t.integer "folding", limit: 1, default: 0
    t.integer "stapler", limit: 1, default: 0
    t.integer "hole", limit: 1, default: 0
    t.text "hole_note"
    t.integer "clip", limit: 1, default: 0
    t.integer "bind", limit: 1, default: 0
    t.text "bind_note"
    t.integer "back_text", limit: 1, default: 0
    t.text "cross_front"
    t.text "cross_back"
    t.integer "cross_color", limit: 1, default: 0
    t.text "wrap_front"
    t.integer "wrap_back_text", limit: 1, default: 0
    t.text "stitching_paper"
    t.integer "secret_stitch", limit: 1, default: 0
    t.text "secret_stitch_paper"
    t.integer "radio_stitch", limit: 1, default: 0
    t.integer "radio_cut", limit: 1, default: 0
    t.text "radio_cut_note"
    t.text "double_doors"
    t.text "gold_letter"
    t.index ["invoice_id"], name: "index_invoice_binds_on_invoice_id"
  end

  create_table "invoice_cards", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "invoice_id"
    t.integer "draft_data", limit: 1, default: 0
    t.text "url"
    t.integer "card_type", limit: 1, default: 0
    t.integer "work_type", limit: 1, default: 0
    t.integer "work_time", default: 0
    t.integer "color", limit: 1, default: 0
    t.integer "paper"
    t.integer "surface", limit: 1, default: 0
    t.integer "emboss", limit: 1, default: 0
    t.index ["invoice_id"], name: "index_invoice_cards_on_invoice_id"
  end

  create_table "invoice_copies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "invoice_id"
    t.integer "posting_state", default: 0
    t.integer "draft_split", limit: 1, default: 0
    t.integer "draft_restore", limit: 1, default: 0
    t.integer "color", limit: 1, default: 0
    t.integer "print_size", limit: 1, default: 0
    t.text "print_size_note"
    t.integer "surface", limit: 1, default: 0
    t.integer "open_type", limit: 1, default: 0
    t.integer "after_process", limit: 1, default: 0
    t.integer "folding", limit: 1, default: 0
    t.integer "stapler", limit: 1, default: 0
    t.integer "hole", limit: 1, default: 0
    t.text "hole_note"
    t.integer "clip", limit: 1, default: 0
    t.integer "bind", limit: 1, default: 0
    t.text "bind_note"
    t.integer "back_text", limit: 1, default: 0
    t.text "back_text_note"
    t.integer "binding_work", limit: 1, default: 0
    t.integer "bind_type", limit: 1, default: 0
    t.text "cross_front"
    t.text "cross_back"
    t.integer "cross_color", limit: 1, default: 0
    t.text "wrap_front"
    t.integer "wrap_back_text", limit: 1, default: 0
    t.text "stitching_paper"
    t.integer "secret_stitch", limit: 1, default: 0
    t.text "secret_stitch_paper"
    t.integer "radio_stitch", limit: 1, default: 0
    t.integer "radio_cut", limit: 1, default: 0
    t.text "radio_cut_note"
    t.text "double_doors"
    t.text "gold_letter"
    t.index ["invoice_id"], name: "index_invoice_copies_on_invoice_id"
  end

  create_table "invoice_prints", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "invoice_id"
    t.integer "draft_data", limit: 1, default: 0
    t.text "url"
    t.integer "work_process", limit: 1, default: 0
    t.integer "work_type", limit: 1, default: 0
    t.text "work_note"
    t.integer "work_time", default: 0
    t.integer "print_work", limit: 1, default: 0
    t.integer "color", limit: 1, default: 0
    t.integer "print_size", limit: 1, default: 0
    t.text "print_size_note"
    t.integer "surface", limit: 1, default: 0
    t.integer "open_type", limit: 1, default: 0
    t.integer "folding", limit: 1, default: 0
    t.integer "stapler", limit: 1, default: 0
    t.integer "hole", limit: 1, default: 0
    t.text "hole_note"
    t.integer "clip", limit: 1, default: 0
    t.integer "bind", limit: 1, default: 0
    t.text "bind_note"
    t.integer "back_text", limit: 1, default: 0
    t.text "back_text_note"
    t.integer "bind_type", limit: 1, default: 0
    t.text "cross_front"
    t.text "cross_back"
    t.integer "cross_color", limit: 1, default: 0
    t.text "wrap_front"
    t.integer "wrap_back_text", limit: 1, default: 0
    t.text "stitching_paper"
    t.integer "secret_stitch", limit: 1, default: 0
    t.text "secret_stitch_paper"
    t.integer "radio_stitch", limit: 1, default: 0
    t.integer "radio_cut", limit: 1, default: 0
    t.text "radio_cut_note"
    t.text "double_doors"
    t.text "gold_letter"
    t.index ["invoice_id"], name: "index_invoice_prints_on_invoice_id"
  end

  create_table "invoice_scans", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "invoice_id"
    t.integer "posting_state", default: 0
    t.integer "draft_split", limit: 1, default: 0
    t.integer "draft_restore", limit: 1, default: 0
    t.integer "back_cut", limit: 1, default: 0
    t.text "back_cut_note"
    t.integer "color", limit: 1, default: 0
    t.integer "resolution", limit: 1, default: 0
    t.integer "extension", limit: 1, default: 0
    t.integer "size_mix", limit: 1, default: 0
    t.integer "adf", limit: 1, default: 0
    t.integer "odr", limit: 1, default: 0
    t.integer "bookmark", limit: 1, default: 0
    t.integer "edit_file_name", limit: 1, default: 0
    t.index ["invoice_id"], name: "index_invoice_scans_on_invoice_id"
  end

  create_table "invoices", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "company_unit_client_id"
    t.string "name"
    t.text "description"
    t.integer "invoice_category", default: 0
    t.integer "invoice_count", default: 0
    t.integer "invoice_type", limit: 1, default: 0
    t.integer "channel", limit: 1, default: 0
    t.datetime "deliver_at"
    t.integer "deliver_type", default: 0
    t.text "deliver_type_note"
    t.text "note"
    t.index ["company_unit_client_id"], name: "index_invoices_on_company_unit_client_id"
    t.index ["user_id"], name: "index_invoices_on_user_id"
  end

  create_table "scheduler_stats", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", null: false
    t.string "hostname", null: false
    t.integer "pid", null: false
    t.integer "duration_ms"
    t.integer "live_slots_start"
    t.integer "live_slots_finish"
    t.datetime "started_at", null: false
    t.boolean "success"
    t.text "error"
  end

  create_table "settings", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "var", null: false
    t.text "value"
    t.integer "thing_id"
    t.string "thing_type", limit: 30
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["thing_type", "thing_id", "var"], name: "index_settings_on_thing_type_and_thing_id_and_var", unique: true
  end

  create_table "static_texts", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_static_texts_on_name"
  end

  create_table "units", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.string "kana"
    t.string "zip"
    t.string "prefecture"
    t.string "address1"
    t.string "sddress2"
    t.text "note"
  end

  create_table "uploads", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name", comment: "ファイルタイトル"
    t.string "author", comment: "作成者ID"
    t.string "author_name", comment: "作成者名"
    t.string "credit", comment: "著作権保有サイト"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "unit_id"
    t.string "name", comment: "ユーザー名"
    t.string "email", comment: "email"
    t.text "comment", comment: "コメント"
    t.integer "status", limit: 1, default: 0, comment: "承認設定"
    t.integer "user_type", limit: 1, default: 0, comment: "ユーザー区分"
    t.string "password_digest", comment: "暗号化済パスワード"
    t.string "provider", comment: "登録元SNS"
    t.string "uid", comment: "登録元SNSユーザーID"
    t.integer "sign_in_count", default: 0, comment: "ログイン回数"
    t.datetime "current_sign_in_at", comment: "ログイン日時"
    t.datetime "last_sign_in_at", comment: "最終ログイン日時"
    t.string "current_sign_in_ip", comment: "ログイン元IP"
    t.string "last_sign_in_ip", comment: "最終ログイン元IP"
    t.datetime "remember_created_at", comment: "継続ログイン情報作成日時"
    t.string "confirmation_token", comment: "認証トークン"
    t.datetime "confirmed_at", comment: "承認日時"
    t.datetime "confirmation_sent_at", comment: "認証トークン作成日時"
    t.string "unconfirmed_email", comment: "承認待時メール送信先"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["password_digest"], name: "index_users_on_password_digest"
    t.index ["unit_id"], name: "index_users_on_unit_id"
  end

end
