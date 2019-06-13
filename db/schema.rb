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

ActiveRecord::Schema.define(version: 2019_06_12_053912) do

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

  create_table "activities", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.date "date", comment: "対応日時"
    t.integer "status", comment: "対応内容"
    t.text "memo", comment: "メモ"
    t.text "attachment", comment: "添付"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "free_word"
    t.bigint "quote_id"
    t.index ["quote_id"], name: "index_activities_on_quote_id"
  end

  create_table "bases", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.string "kana"
    t.string "zip"
    t.string "prefecture"
    t.string "address1"
    t.string "address2"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.string "kana"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "mf_company_id"
    t.text "free_word"
  end

  create_table "company_division_clients", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "company_division_id"
    t.bigint "user_id"
    t.string "name"
    t.string "kana"
    t.integer "title", limit: 1, default: 10
    t.string "tel"
    t.string "email"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "free_word"
    t.index ["company_division_id"], name: "index_company_division_clients_on_company_division_id"
    t.index ["user_id"], name: "index_company_division_clients_on_user_id"
  end

  create_table "company_divisions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "company_id"
    t.string "name"
    t.string "kana"
    t.string "zip"
    t.string "tel"
    t.integer "prefecture_id"
    t.string "address1"
    t.string "address2"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "mf_company_division_id"
    t.text "free_word"
    t.index ["company_id"], name: "index_company_divisions_on_company_id"
  end

  create_table "divisions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.string "kana"
    t.string "zip"
    t.string "tel"
    t.integer "prefecture_id"
    t.string "address1"
    t.string "address2"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "estimate_items", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "estimate_id"
    t.bigint "item_id"
    t.integer "cost", comment: "原価"
    t.integer "gross_profit", comment: "粗利"
    t.text "detail", comment: "詳細"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["estimate_id"], name: "index_estimate_items_on_estimate_id"
    t.index ["item_id"], name: "index_estimate_items_on_item_id"
  end

  create_table "estimates", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "project_id"
    t.string "estimat_number", comment: "見積もり番号"
    t.date "date", comment: "発行日"
    t.date "expiration", comment: "有効期限"
    t.string "subject", comment: "件名"
    t.string "item", comment: "品目"
    t.integer "unit_price", comment: "単価"
    t.integer "quantity", comment: "数量"
    t.integer "cost", comment: "原価"
    t.integer "gross_profit", comment: "粗利"
    t.text "detail", comment: "詳細"
    t.text "remarks", comment: "備考"
    t.string "tag", comment: "タグ"
    t.text "memo", comment: "メモ"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_estimates_on_project_id"
  end

  create_table "invoices", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "quote_id"
    t.date "date", comment: "請求日"
    t.date "expiration", comment: "支払い期限"
    t.string "subject", comment: "件名"
    t.text "remarks", comment: "備考"
    t.text "memo", comment: "メモ"
    t.text "free_word", comment: "検索用"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "attention"
    t.string "mf_invoice_id"
    t.string "pdf_url"
    t.index ["quote_id"], name: "index_invoices_on_quote_id"
  end

  create_table "payments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "subcontractor_id"
    t.bigint "work_subcontractor_detail_id"
    t.integer "price", default: 0
    t.date "date", comment: "支払日"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subcontractor_id"], name: "index_payments_on_subcontractor_id"
    t.index ["work_subcontractor_detail_id"], name: "index_payments_on_work_subcontractor_detail_id"
  end

  create_table "project_after_processes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "project_id"
    t.integer "folding", limit: 1, default: 0
    t.integer "folding_price", default: 0
    t.integer "stapler", limit: 1, default: 0
    t.integer "stapler_price", default: 0
    t.integer "hole", limit: 1, default: 0
    t.integer "hole_price", default: 0
    t.text "hole_note"
    t.integer "clip", limit: 1, default: 0
    t.integer "clip_price", default: 0
    t.integer "bind", limit: 1, default: 0
    t.integer "bind_price", default: 0
    t.text "bind_note"
    t.integer "back_text", limit: 1, default: 0
    t.integer "back_text_price", default: 0
    t.text "back_text_note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "note"
    t.index ["project_id"], name: "index_project_after_processes_on_project_id"
  end

  create_table "project_binding_works", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "project_id"
    t.integer "bind_type", limit: 1, default: 0
    t.text "cross_front"
    t.text "cross_back"
    t.integer "cross_color", limit: 1, default: 0
    t.text "wrap_front"
    t.integer "wrap_back_text", limit: 1, default: 0
    t.text "stitching_paper"
    t.integer "secret_stitch", limit: 1, default: 0
    t.integer "secret_stitch_paper", limit: 1, default: 0
    t.integer "radio_stitch", limit: 1, default: 0
    t.integer "radio_cut", limit: 1, default: 0
    t.text "radio_cut_note"
    t.text "double_doors"
    t.text "gold_letter"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "note"
    t.integer "price"
    t.index ["project_id"], name: "index_project_binding_works_on_project_id"
  end

  create_table "project_binds", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "project_id"
    t.integer "posting_state", default: 0
    t.integer "print_size", limit: 1, default: 0
    t.text "print_size_note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "price"
    t.index ["project_id"], name: "index_project_binds_on_project_id"
  end

  create_table "project_cards", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "project_id"
    t.integer "draft_data", limit: 1, default: 0
    t.text "url"
    t.integer "card_type", limit: 1, default: 0
    t.integer "work_type", limit: 1, default: 0
    t.integer "work_time", default: 0
    t.integer "work_price", default: 0
    t.integer "color", limit: 1, default: 0
    t.integer "paper", limit: 1, default: 0
    t.integer "surface", limit: 1, default: 0
    t.integer "emboss", limit: 1, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "price"
    t.index ["project_id"], name: "index_project_cards_on_project_id"
  end

  create_table "project_copies", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "project_id"
    t.integer "posting_state", default: 0
    t.integer "draft_split", limit: 1, default: 0
    t.integer "draft_restore", limit: 1, default: 0
    t.integer "color", limit: 1, default: 0
    t.integer "print_size", limit: 1, default: 0
    t.text "print_size_note"
    t.integer "surface", limit: 1, default: 0
    t.integer "open_type", limit: 1, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "posting_state_note"
    t.integer "price"
    t.index ["project_id"], name: "index_project_copies_on_project_id"
  end

  create_table "project_histories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "project_id"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_histories_on_project_id"
  end

  create_table "project_prints", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "project_id"
    t.integer "draft_data", limit: 1, default: 0
    t.text "url"
    t.integer "work_process", limit: 1, default: 0
    t.integer "work_type", limit: 1, default: 0
    t.text "work_note"
    t.integer "work_time", default: 0
    t.integer "work_price", default: 0
    t.integer "print_work", limit: 1, default: 0
    t.integer "color", limit: 1, default: 0
    t.integer "print_size", limit: 1, default: 0
    t.text "print_size_note"
    t.integer "surface", limit: 1, default: 0
    t.integer "open_type", limit: 1, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "price"
    t.index ["project_id"], name: "index_project_prints_on_project_id"
  end

  create_table "project_scans", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "project_id"
    t.integer "posting_state", default: 0
    t.integer "print_size", limit: 1, default: 0
    t.integer "draft_split", limit: 1, default: 0
    t.integer "draft_restore", limit: 1, default: 0
    t.integer "back_cut", limit: 1, default: 0
    t.text "back_cut_note"
    t.integer "color", limit: 1, default: 0
    t.integer "resolution", limit: 1, default: 0
    t.integer "file_extension", limit: 1, default: 0
    t.integer "size_mix", limit: 1, default: 0
    t.integer "adf", limit: 1, default: 0
    t.integer "odr", limit: 1, default: 0
    t.integer "bookmark", limit: 1, default: 0
    t.integer "edit_file_name", limit: 1, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "posting_state_note"
    t.integer "price"
    t.index ["project_id"], name: "index_project_scans_on_project_id"
  end

  create_table "projects", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "company_division_client_id"
    t.string "name"
    t.text "description"
    t.integer "project_category", default: 0
    t.integer "project_count", default: 0
    t.integer "binding_work", limit: 1, default: 0
    t.integer "after_process", limit: 1, default: 0
    t.text "note"
    t.integer "status", limit: 1, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "free_word"
    t.bigint "project_number"
    t.integer "price", default: 0
    t.index ["company_division_client_id"], name: "index_projects_on_company_division_client_id"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "quote_items", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "quote_id"
    t.integer "cost", comment: "コスト"
    t.decimal "gross_profit", precision: 11, scale: 8, comment: "粗利"
    t.string "detail", comment: "詳細"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.integer "unit_price"
    t.integer "quantity"
    t.index ["quote_id"], name: "index_quote_items_on_quote_id"
  end

  create_table "quote_projects", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "quote_id"
    t.bigint "project_id"
    t.string "price", default: "10"
    t.string "unit", default: "10"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "unit_price"
    t.string "project_name"
    t.text "remarks"
    t.index ["project_id"], name: "index_quote_projects_on_project_id"
    t.index ["quote_id"], name: "index_quote_projects_on_quote_id"
  end

  create_table "quotes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.date "date", comment: "発行日"
    t.date "expiration", comment: "発行期限"
    t.string "subject", comment: "件名"
    t.text "remarks", comment: "備考"
    t.text "memo", comment: "メモ"
    t.text "free_word", comment: "検索用"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "price"
    t.integer "attention"
    t.text "pdf_url"
    t.text "mf_quote_id"
    t.integer "user_id"
    t.integer "status", default: 0
    t.string "quote_number"
    t.integer "company_division_client_id"
    t.integer "quote_type"
    t.integer "channel"
    t.datetime "deliver_at"
    t.integer "deliver_type"
    t.text "deliver_type_note"
    t.bigint "division_id"
    t.integer "discount"
    t.integer "delivery_type"
    t.text "delivery_type_note"
    t.index ["division_id"], name: "index_quotes_on_division_id"
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

  create_table "subcontractor_division_clients", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "subcontractor_division_id"
    t.bigint "user_id"
    t.string "name"
    t.string "kana"
    t.integer "title", limit: 1, default: 10
    t.string "tel"
    t.string "email"
    t.text "note"
    t.text "free_word"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subcontractor_division_id"], name: "subcontractor_division_clients_index"
    t.index ["user_id"], name: "index_subcontractor_division_clients_on_user_id"
  end

  create_table "subcontractor_divisions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "subcontractor_id"
    t.string "name"
    t.string "kana"
    t.string "zip"
    t.string "tel"
    t.integer "prefecture_id"
    t.string "address1"
    t.string "address2"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "free_word"
    t.index ["subcontractor_id"], name: "index_subcontractor_divisions_on_subcontractor_id"
  end

  create_table "subcontractors", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "name"
    t.string "kana"
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "free_word"
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
    t.bigint "division_id"
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
    t.string "mf_access_token"
    t.datetime "mf_token_expires_in"
    t.string "mf_refresh_token"
    t.index ["division_id"], name: "index_users_on_division_id"
    t.index ["email"], name: "index_users_on_email"
    t.index ["password_digest"], name: "index_users_on_password_digest"
  end

  create_table "work_details", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "work_id"
    t.string "count"
    t.datetime "deliver_at"
    t.string "client_name"
    t.integer "status", default: 0, null: false
    t.string "estimated_man_hours"
    t.string "estimated_cost"
    t.string "actual_man_hours"
    t.string "actual_cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "order_contents"
    t.text "deliver_method"
    t.text "specification"
    t.string "number_of_copies"
    t.index ["work_id"], name: "index_work_details_on_work_id"
  end

  create_table "work_subcontractor_details", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "work_subcontractor_id"
    t.string "order_contents"
    t.text "deliver_method"
    t.text "specification"
    t.string "count"
    t.string "number_of_copies"
    t.datetime "deliver_at"
    t.string "cost_unit_price"
    t.string "estimated_cost"
    t.string "actual_count"
    t.string "actual_cost"
    t.integer "status", limit: 1, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "work_id"
    t.index ["work_id"], name: "index_work_subcontractor_details_on_work_id"
    t.index ["work_subcontractor_id"], name: "index_work_subcontractor_details_on_work_subcontractor_id"
  end

  create_table "work_subcontractors", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "work_id"
    t.bigint "subcontractor_division_client_id"
    t.integer "status", limit: 1, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "notices"
    t.datetime "order_date"
    t.datetime "delivery_date"
    t.string "delivery_destination"
    t.index ["subcontractor_division_client_id"], name: "index_work_subcontractors_on_subcontractor_division_client_id"
    t.index ["work_id"], name: "index_work_subcontractors_on_work_id"
  end

  create_table "works", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci", force: :cascade do |t|
    t.bigint "quote_id"
    t.integer "price", default: 0
    t.integer "cost", default: 0
    t.integer "status", limit: 1, default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "free_word"
    t.text "notices"
    t.bigint "division_id"
    t.index ["division_id"], name: "index_works_on_division_id"
    t.index ["quote_id"], name: "index_works_on_quote_id"
  end

  add_foreign_key "quotes", "divisions"
  add_foreign_key "work_details", "works"
  add_foreign_key "works", "divisions"
end
