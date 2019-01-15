class InitSchema < ActiveRecord::Migration[5.2]
  
  def change

    ##
    # 自社部署
    # @version 2018/06/10
    #
    create_table :units do |t|

      t.string :name
      t.string :kana
      t.string :zip
      t.string :prefecture
      t.string :address1
      t.string :sddress2
      t.text :note
    end

    ##
    # ユーザー
    # @version 2018/06/10
    #
    create_table :users do |t|

      t.references :unit,                index: true
      t.string     :name,                limit: 191,                            comment: 'ユーザー名'
      t.string     :email,               limit: 191, index: true, unique: true, comment: 'email'
      t.text       :comment,                                                    comment: 'コメント'
      t.integer    :status,              limit: 1,   default: 0,                comment: '承認設定'
      t.integer    :user_type,           limit: 1,   default: 0,                comment: 'ユーザー区分'
      t.string     :password_digest,     limit: 191, index: true,               comment: '暗号化済パスワード'
      t.string     :provider,            limit: 191,                            comment: '登録元SNS'
      t.string     :uid,                 limit: 191,                            comment: '登録元SNSユーザーID'
      t.integer    :sign_in_count,       limit: 4,   default: 0,                comment: 'ログイン回数'
      t.datetime   :current_sign_in_at,                                         comment: 'ログイン日時'
      t.datetime   :last_sign_in_at,                                            comment: '最終ログイン日時'
      t.string     :current_sign_in_ip,  limit: 191,                            comment: 'ログイン元IP'
      t.string     :last_sign_in_ip,     limit: 191,                            comment: '最終ログイン元IP'
      t.datetime   :remember_created_at,                                        comment: '継続ログイン情報作成日時'
      t.string     :confirmation_token,                                         comment: '認証トークン'
      t.datetime   :confirmed_at,                                               comment: '承認日時'
      t.datetime   :confirmation_sent_at,                                       comment: '認証トークン作成日時'
      t.string     :unconfirmed_email,                                          comment: '承認待時メール送信先'

      t.timestamps
    end

    ##
    # 取引先会社
    # @version 2018/06/10
    #
    create_table :companies do |t|

      t.string :name
      t.string :kana
      t.integer :title, limit: 1, default: 0
      t.text :note
    end

    ##
    # 取引先会社-部署
    # @version 2018/06/10
    #
    create_table :company_units do |t|

      t.string  :name
      t.string  :kana
      t.integer :title, limit: 1, default: 0
      t.string  :zip
      t.string  :prefecture
      t.string  :address1
      t.string  :sddress2
      t.text :note
    end

    ##
    # 取引先担当者
    # @version 2018/06/10
    #
    create_table :company_unit_clients do |t|

      t.references :company_unit,  index: true
      t.references :user,          index: true
      t.string  :name
      t.string  :kana
      t.integer :title, limit: 1, default: 0
      t.string  :tel
      t.string  :email
      t.text :note
    end

    ##
    # 案件
    # @version 2018/06/10
    #
    create_table :invoices do |t|

      t.references :user,          index: true
      t.references :company_unit_client, index: true
      t.string     :name,            limit: 191
      t.text       :description
      t.integer    :invoice_category,  limit: 4,     default: 0
      t.integer    :invoice_count,     default: 0
      t.integer    :invoice_type,      limit: 1,     default: 0
      t.integer    :channel,         limit: 1,     default: 0
      t.datetime   :deliver_at
      t.integer    :deliver_type,    limit: 4,     default: 0
      t.text       :deliver_type_note
      t.text       :note
    end

    ##
    # 案件(コピー)
    # @version 2018/06/10
    #
    create_table :invoice_copies do |t|
      
      t.references :invoice,           index: true
      t.integer    :posting_state,   default: 0
      t.integer    :draft_split,     limit: 1,     default: 0
      t.integer    :draft_restore,   limit: 1,     default: 0
      t.integer    :color,           limit: 1,     default: 0
      t.integer    :print_size,      limit: 1,     default: 0
      t.text       :print_size_note
      t.integer    :surface,         limit: 1,     default: 0
      t.integer    :open_type,       limit: 1,     default: 0
      t.integer    :after_process,   limit: 1,     default: 0
      t.integer    :folding,         limit: 1,     default: 0
      t.integer    :stapler,         limit: 1,     default: 0
      t.integer    :hole,            limit: 1,     default: 0
      t.text       :hole_note
      t.integer    :clip,            limit: 1,     default: 0
      t.integer    :bind,            limit: 1,     default: 0
      t.text       :bind_note
      t.integer    :back_text,       limit: 1,     default: 0
      t.text       :back_text_note
      t.integer    :binding_work,    limit: 1,     default: 0
      t.integer    :bind_type,       limit: 1,     default: 0
      t.text       :cross_front
      t.text       :cross_back
      t.integer    :cross_color,     limit: 1,     default: 0
      t.text       :wrap_front
      t.integer    :wrap_back_text,  limit: 1,     default: 0
      t.text       :stitching_paper
      t.integer    :secret_stitch,   limit: 1,     default: 0
      t.text       :secret_stitch_paper
      t.integer    :secret_stitch,   limit: 1,     default: 0
      t.integer    :radio_stitch,    limit: 1,     default: 0
      t.integer    :radio_cut,       limit: 1,     default: 0
      t.text       :radio_cut_note
      t.text       :double_doors
      t.text       :gold_letter
    end

    ##
    # 案件(プリント)
    # @version 2018/06/10
    #
    create_table :invoice_prints do |t|

      t.references :invoice,            index: true
      t.integer    :draft_data,       limit: 1,     default: 0
      t.text       :url
      t.integer    :work_process,     limit: 1,     default: 0
      t.integer    :work_type,        limit: 1,     default: 0
      t.text       :work_note
      t.integer    :work_time,        default: 0
      t.integer    :print_work,       limit: 1,     default: 0
      t.integer    :color,            limit: 1,     default: 0
      t.integer    :print_size,       limit: 1,     default: 0
      t.text       :print_size_note
      t.integer    :surface,          limit: 1,     default: 0
      t.integer    :open_type,        limit: 1,     default: 0
      t.integer    :folding,          limit: 1,     default: 0
      t.integer    :stapler,          limit: 1,     default: 0
      t.integer    :hole,             limit: 1,     default: 0
      t.text       :hole_note
      t.integer    :clip,             limit: 1,     default: 0
      t.integer    :stapler,          limit: 1,     default: 0
      t.integer    :bind,             limit: 1,     default: 0
      t.text       :bind_note
      t.integer    :back_text,        limit: 1,     default: 0
      t.text       :back_text_note
      t.integer    :bind_type,       limit: 1,     default: 0
      t.text       :cross_front
      t.text       :cross_back
      t.integer    :cross_color,     limit: 1,     default: 0
      t.text       :wrap_front
      t.integer    :wrap_back_text,  limit: 1,     default: 0
      t.text       :stitching_paper
      t.integer    :secret_stitch,   limit: 1,     default: 0
      t.text       :secret_stitch_paper
      t.integer    :secret_stitch,   limit: 1,     default: 0
      t.integer    :radio_stitch,    limit: 1,     default: 0
      t.integer    :radio_cut,       limit: 1,     default: 0
      t.text       :radio_cut_note
      t.text       :double_doors
      t.text       :gold_letter
    end

    ##
    # 案件(カード)
    # @version 2018/06/10
    #
    create_table :invoice_cards do |t|

      t.references :invoice,            index: true
      t.integer    :draft_data,       limit: 1,     default: 0
      t.text       :url
      t.integer    :card_type,        limit: 1,     default: 0
      t.integer    :work_type,        limit: 1,     default: 0
      t.integer    :work_time,        default: 0
      t.integer    :color,            limit: 1,     default: 0
      t.integer    :paper
      t.integer    :surface,          limit: 1,     default: 0
      t.integer    :emboss,           limit: 1,     default: 0
    end

    ##
    # 案件(スキャン)
    # @version 2018/06/10
    #
    create_table :invoice_scans do |t|

      t.references :invoice,           index: true
      t.integer    :posting_state,   default: 0
      t.integer    :draft_split,     limit: 1,     default: 0
      t.integer    :draft_restore,   limit: 1,     default: 0
      t.integer    :back_cut,        limit: 1,     default: 0
      t.text       :back_cut_note
      t.integer    :color,           limit: 1,     default: 0
      t.integer    :resolution,      limit: 1,     default: 0
      t.integer    :extension,       limit: 1,     default: 0
      t.integer    :size_mix,        limit: 1,     default: 0
      t.integer    :adf,             limit: 1,     default: 0
      t.integer    :odr,             limit: 1,     default: 0
      t.integer    :bookmark,        limit: 1,     default: 0
      t.integer    :edit_file_name,  limit: 1,     default: 0
    end

    ##
    # 案件(製本のみ)
    # @version 2018/06/10
    #
    create_table :invoice_binds do |t|

      t.references :invoice,           index: true
      t.integer    :posting_state,   default: 0
      t.integer    :print_size,      limit: 1,     default: 0
      t.text       :print_size_note
      t.integer    :folding,         limit: 1,     default: 0
      t.integer    :stapler,         limit: 1,     default: 0
      t.integer    :hole,            limit: 1,     default: 0
      t.text       :hole_note
      t.integer    :clip,            limit: 1,     default: 0
      t.integer    :bind,            limit: 1,     default: 0
      t.text       :bind_note
      t.integer    :back_text,       limit: 1,     default: 0
      t.text       :cross_front
      t.text       :cross_back
      t.integer    :cross_color,     limit: 1,     default: 0
      t.text       :wrap_front
      t.integer    :wrap_back_text,  limit: 1,     default: 0
      t.text       :stitching_paper
      t.integer    :secret_stitch,   limit: 1,     default: 0
      t.text       :secret_stitch_paper
      t.integer    :secret_stitch,   limit: 1,     default: 0
      t.integer    :radio_stitch,    limit: 1,     default: 0
      t.integer    :radio_cut,       limit: 1,     default: 0
      t.text       :radio_cut_note
      t.text       :double_doors
      t.text       :gold_letter
    end

    ##
    # アップロードファイル
    # @version 2018/06/10
    #
    create_table :uploads do |t|

      t.string     :name,        limit: 191, comment: 'ファイルタイトル'
      t.string     :author,      limit: 191, comment: '作成者ID'
      t.string     :author_name, limit: 191, comment: '作成者名'
      t.string     :credit,      limit: 191, comment: '著作権保有サイト'

      t.timestamps
    end

    ##
    # アップロードファイル
    # @version 2018/06/10
    #
    create_table :active_storage_blobs do |t|
      t.string   :key,        null: false
      t.string   :filename,   null: false
      t.string   :content_type
      t.text     :metadata
      t.bigint   :byte_size,  null: false
      t.string   :checksum,   null: false
      t.datetime :created_at, null: false

      t.index [ :key ], unique: true
    end

    ##
    # アップロードファイル
    # @version 2018/06/10
    #
    create_table :active_storage_attachments do |t|
      t.string     :name,     null: false
      t.references :record,   null: false, polymorphic: true, index: false
      t.references :blob,     null: false

      t.datetime :created_at, null: false

      t.index [ :record_type, :record_id, :name, :blob_id ], name: :index_active_storage_attachments_uniqueness, unique: true
    end

    # configs - rails-settings-cached
    create_table :settings do |t|
      t.string  :var,        null: false
      t.text    :value,      null: true
      t.integer :thing_id,   null: true
      t.string  :thing_type, null: true, limit: 30

      t.timestamps
    end

    add_index :settings, [ :thing_type, :thing_id, :var ], unique: true

    ##
    # 定期job実行 - mini_scheduler
    # @version 2018/06/10
    #
    create_table :scheduler_stats do |t|
      t.string :name, null: false
      t.string :hostname, null: false
      t.integer :pid, null: false
      t.integer :duration_ms
      t.integer :live_slots_start
      t.integer :live_slots_finish
      t.datetime :started_at, null: false
      t.boolean :success
      t.text :error
    end

  end
end
