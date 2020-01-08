class InitSchema < ActiveRecord::Migration[5.2]
  
  def change

    ##
    # 自社部署
    # @version 2018/06/10
    #
    create_table :bases do |t|

      t.string :name
      t.string :kana
      t.string :zip
      t.string :prefecture
      t.string :address1
      t.string :address2
      t.text :note

      t.timestamps
    end

    ##
    # ユーザー
    # @version 2018/06/10
    #
    create_table :users do |t|
      t.references	:division,            index: true
      t.string     	:name,                limit: 191,                            comment: 'ユーザー名'
      t.string     	:email,               limit: 191, index: true, unique: true, comment: 'email'
      t.text       	:comment,                                                    comment: 'コメント'
      t.integer    	:status,              limit: 1,   default: 0,                comment: '承認設定'
      t.integer    	:user_type,           limit: 1,   default: 0,                comment: 'ユーザー区分'
      t.string     	:password_digest,     limit: 191, index: true,               comment: '暗号化済パスワード'
      t.string     	:provider,            limit: 191,                            comment: '登録元SNS'
      t.string     	:uid,                 limit: 191,                            comment: '登録元SNSユーザーID'
      t.integer    	:sign_in_count,       limit: 4,   default: 0,                comment: 'ログイン回数'
      t.datetime   	:current_sign_in_at,                                         comment: 'ログイン日時'
      t.datetime   	:last_sign_in_at,                                            comment: '最終ログイン日時'
      t.string     	:current_sign_in_ip,  limit: 191,                            comment: 'ログイン元IP'
      t.string     	:last_sign_in_ip,     limit: 191,                            comment: '最終ログイン元IP'
      t.datetime   	:remember_created_at,                                        comment: '継続ログイン情報作成日時'
      t.string     	:confirmation_token,                                         comment: '認証トークン'
      t.datetime   	:confirmed_at,                                               comment: '承認日時'
      t.datetime   	:confirmation_sent_at,                                       comment: '認証トークン作成日時'
			t.string     	:unconfirmed_email,                                          comment: '承認待時メール送信先'
			t.datetime		:lastaccesstask,			default: DateTime.now

      t.timestamps
    end

    ##
    # 取引先会社
    # @version 2018/06/10
    #
    create_table :companies do |t|
      t.string	:name
			t.string 	:kana
			t.text 	 	:note
			t.text 		:free_word

      t.timestamps
    end

    ##
    # 取引先会社-部署
    # @version 2018/06/10
    #
    create_table :company_divisions do |t|
      t.references 	:company,  index: true
      t.string  		:name
      t.string  		:kana
      t.string  		:zip
      t.string  		:tel
      t.integer 		:prefecture_id
      t.string  		:address1
			t.string  		:address2
			t.text 				:note
			t.text 				:free_word

			t.timestamps
		end

		##
    # 自社部署
    # @version 2018/06/10
    #
    create_table :divisions do |t|

      t.string  :name
      t.string  :kana
      t.string  :zip
      t.string  :tel
      t.integer :prefecture_id
      t.string  :address1
      t.string  :address2
      t.text :note

      t.timestamps
    end

    ##
    # 取引先担当者
    # @version 2018/06/10
    #
    create_table :company_division_clients do |t|
      t.references	:company_division,			index: true
      t.references	:user,          				index: true
      t.string 			:name
      t.string 			:kana
      t.integer			:title,									limit: 1,		default: 10
      t.string 			:tel
      t.string 			:email
			t.text				:note
			t.text				:free_word
			t.integer			:status, limit: 1,  		default: 0, 							comment: '承認設定'
			t.integer 		:user_type, limit: 1,		default: 0, 							comment: 'ユーザー区分'
			t.string			:password_digest,				limit: 191,	index: true,	comment: '暗号化済パスワード'
			t.string			:provider,							limit: 191, 							comment: '登録元SNS'
			t.string			:uid,										limit: 191, 							comment: '登録元SNSユーザーID'
			t.integer			:sign_in_count,					limit: 4,		default: 0, 	comment: 'ログイン回数'
			t.datetime		:current_sign_in_at,															comment: 'ログイン日時'
			t.datetime		:last_sign_in_at,																	comment: '最終ログイン日時'
			t.string			:current_sign_in_ip,		limit: 191,								comment: 'ログイン元IP'
			t.string			:last_sign_in_ip,				limit: 191,								comment: '最終ログイン元IP'
			t.datetime		:remember_created_at,															comment: '継続ログイン情報作成日時'
			t.string			:confirmation_token,															comment: '認証トークン'
			t.datetime		:confirmed_at,																		comment: '承認日時'
			t.datetime		:confirmation_sent_at,														comment: '認証トークン作成日時'
			t.string			:unconfirmed_email,																comment: '承認待時メール送信先'
			t.datetime		:lastaccesstask, 				default: DateTime.now
			t.integer			:opt,										default: 0

      t.timestamps
    end

    ##
    # 案件
    # @version 2018/06/10
    #
    create_table :projects do |t|
      t.references 	:user,          														index: true
      t.references 	:company_division_client, 									index: true
      t.string     	:name,            	limit: 191
      t.text       	:description
      t.integer    	:project_category,	limit: 4,		default: 0
      t.integer    	:project_count,     						default: 0
      t.integer    	:binding_work,    	limit: 1,   default: 0
      t.integer    	:after_process,   	limit: 1,   default: 0
      t.text       	:note
			t.integer    	:status,   					limit: 1,   default: 0
			t.text 				:free_word
			t.bigint 			:project_number
			t.integer	 		:price, 												default: 0
			t.string			:code

      t.timestamps
    end

    ##
    # 案件編集履歴
    # @version 2018/06/10
    #
    create_table :project_histories do |t|
      t.references :project,         index: true
      t.text       :note

      t.timestamps
    end

    ##
    # 案件(コピー)
    # @version 2018/06/10
    #
    create_table :project_copies do |t|
      t.references 	:project,         index: true
      t.integer    	:posting_state,   default: 0
      t.integer    	:draft_split,     limit: 1,     default: 0
      t.integer    	:draft_restore,   limit: 1,     default: 0
      t.integer    	:color,           limit: 1,     default: 0
      t.integer    	:print_size,      limit: 1,     default: 0
      t.text       	:print_size_note
      t.integer    	:surface,         limit: 1,     default: 0
      t.integer    	:open_type,       limit: 1,     default: 0
			t.text				:posting_state_note
			t.integer			:price

      t.timestamps
    end

    ##
    # 案件(プリント)
    # @version 2018/06/10
    #
    create_table :project_prints do |t|
      t.references 	:project,           index: true
      t.integer    	:draft_data,       	limit: 1,     default: 0
      t.text       	:url
      t.integer    	:work_process,     	limit: 1,     default: 0
      t.integer    	:work_type,        	limit: 1,     default: 0
      t.text       	:work_note
			t.integer    	:work_time,        	default: 0
			t.integer			:work_price,				default: 0,		after: :work_time
      t.integer    	:print_work,       	limit: 1,     default: 0
      t.integer    	:color,            	limit: 1,     default: 0
      t.integer    	:print_size,       	limit: 1,     default: 0
      t.text       	:print_size_note
      t.integer    	:surface,          	limit: 1,     default: 0
      t.integer    	:open_type,        	limit: 1,     default: 0
			t.integer			:price

      t.timestamps
    end

    ##
    # 案件(カード)
    # @version 2018/06/10
    #
    create_table :project_cards do |t|
      t.references 	:project,          	index: true
      t.integer    	:draft_data,       	limit: 1,     default: 0
      t.text       	:url
      t.integer    	:card_type,        	limit: 1,     default: 0
      t.integer    	:work_type,        	limit: 1,     default: 0
			t.integer    	:work_time,        	default: 0
			t.integer			:work_price,				default: 0,		after: :work_time
      t.integer    	:color,            	limit: 1,     default: 0
      t.integer    	:paper,            	limit: 1,     default: 0
      t.integer    	:surface,          	limit: 1,     default: 0
      t.integer    	:emboss,           	limit: 1,     default: 0
			t.integer			:price

      t.timestamps
    end

    ##
    # 案件(スキャン)
    # @version 2018/06/10
    #
    create_table :project_scans do |t|
      t.references 	:project,         index: true
      t.integer    	:posting_state,   default: 0
      t.integer    	:print_size,      limit: 1,     default: 0
      t.integer    	:draft_split,     limit: 1,     default: 0
      t.integer    	:draft_restore,   limit: 1,     default: 0
      t.integer    	:back_cut,        limit: 1,     default: 0
      t.text       	:back_cut_note
      t.integer    	:color,           limit: 1,     default: 0
      t.integer    	:resolution,      limit: 1,     default: 0
      t.integer    	:file_extension,  limit: 1,     default: 0
      t.integer    	:size_mix,        limit: 1,     default: 0
      t.integer    	:adf,             limit: 1,     default: 0
      t.integer    	:odr,             limit: 1,     default: 0
      t.integer    	:bookmark,        limit: 1,     default: 0
      t.integer    	:edit_file_name,  limit: 1,     default: 0
			t.text				:posting_state_note
			t.integer			:price

      t.timestamps
    end

    ##
    # 案件(製本のみ)
    # @version 2018/06/10
    #
    create_table :project_binds do |t|
      t.references 	:project,         index: true
      t.integer    	:posting_state,   default: 0
      t.integer    	:print_size,      limit: 1,     default: 0
			t.text       	:print_size_note
			t.integer			:price

      t.timestamps
    end

    ##
    # 後加工作業
    # @version 2018/06/10
    #
    create_table :project_after_processes do |t|
      t.references 	:project,         	index: true
			t.integer    	:folding,          	limit: 1,     default: 0
			t.integer			:folding_price,			default: 0,		after: :folding
			t.integer    	:stapler,          	limit: 1,     default: 0
			t.integer			:stapler_price,			default: 0,		after: :stapler
			t.integer    	:hole,             	limit: 1,     default: 0
			t.integer			:hole_price,				default: 0,		after: :hole
      t.text       	:hole_note
			t.integer    	:clip,             	limit: 1,     default: 0
			t.integer			:clip_price,				default: 0,		after: :clip
			t.integer    	:bind,             	limit: 1,     default: 0
			t.integer			:bind_price,				default: 0,		after: :bind
      t.text       	:bind_note
			t.integer    	:back_text,        	limit: 1,     default: 0
			t.integer			:back_text_price,		default: 0,		after: :back_text
      t.text       	:back_text_note
			t.text				:note

      t.timestamps
    end

    ##
    # 製本仕様
    # @version 2018/06/10
    #
    create_table :project_binding_works do |t|
      t.references 	:project,         		index: true
      t.integer    	:bind_type,       		limit: 1,		default: 0
      t.text       	:cross_front
      t.text       	:cross_back
      t.integer    	:cross_color,     		limit: 1,   default: 0
      t.text       	:wrap_front
      t.integer    	:wrap_back_text,  		limit: 1,   default: 0
      t.text       	:stitching_paper
      t.integer    	:secret_stitch,   		limit: 1,   default: 0
      t.integer    	:secret_stitch_paper,	limit: 1,	  default: 0
      t.integer    	:radio_stitch,    		limit: 1,   default: 0
      t.integer    	:radio_cut,       		limit: 1,   default: 0
      t.text       	:radio_cut_note
      t.text       	:double_doors
			t.text       	:gold_letter
			t.text			 	:note
			t.integer			:price

      t.timestamps
    end

    ##
    # アップロードファイル
    # @version 2018/06/10
    #
    create_table :uploads do |t|
      t.string	:name,        limit: 191, comment: 'ファイルタイトル'
      t.string	:author,      limit: 191, comment: '作成者ID'
      t.string	:author_name, limit: 191, comment: '作成者名'
      t.string	:credit,      limit: 191, comment: '著作権保有サイト'

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
      t.string		:name,							null: false
      t.string		:hostname,					null: false
      t.integer		:pid,								null: false
      t.integer		:duration_ms
      t.integer		:live_slots_start
      t.integer		:live_slots_finish
      t.datetime	:started_at,				null: false
      t.boolean		:success
			t.text			:error

		end
		
		##
		# 作業書
		# @version 2019/12/19
		#
		create_table :works do |t|
			t.references 	:quote,  index: true
      t.integer    	:price,    default: 0
      t.integer   	:cost,     default: 0
      t.integer    	:status,   limit: 1,		default: 0
			t.text 			 	:free_word
			t.text				:notices
			t.references 	:division,	foreign_key: true

      t.timestamps
    end

		##
		#	Histroy
		#	@version 2019/12/19
		#
		create_table :activities do |t|
      t.date 				:date,							comment:'対応日時'
      t.integer			:status, 						comment:'対応内容'
      t.text				:memo, 							comment:'メモ'
			t.text				:attachment,				comment:'添付'
			t.text 				:free_word
			t.integer			:accurary,					comment:'確度'
			t.integer			:next_action,				comment:'次回アクション'
			t.date				:next_action_date,	comment:'次回アクション期日'
			t.date				:scheduled_date, 		comment:'受注予定日'
			t.references 	:quote

      t.timestamps
		end

		##
		# 作業書に紐づくモノたち
		# @version 2019/12/19
		#
		create_table :work_details do |t|
      t.references	:work,								foreign_key: true
      t.string			:count
      t.datetime		:deliver_at
      t.string 			:client_name
      t.integer 		:status,							limit: 4,	null: false,	default: 0
      t.string 			:estimated_man_hours
      t.string 			:estimated_cost
      t.string 			:actual_man_hours
			t.string 			:actual_cost
			t.string			:order_contents
			t.text				:deliver_method
			t.text				:specification
			t.string			:number_of_copies

      t.timestamps
		end

		##
		#	下請け業者
		# @version 2019/12/18
		#
    create_table :subcontractors do |t|
      t.string 	:name
      t.string 	:kana
			t.text 		:note
			t.text 		:free_word

      t.timestamps
		end

		##
		#	下請け業者部門
		# @version 2019/12/18
		#
		create_table :subcontractor_divisions do |t|
      t.references	:subcontractor,	index: true
      t.string			:name
      t.string			:kana
      t.string			:zip
      t.string			:tel
      t.integer			:prefecture_id
      t.string			:address1
      t.string			:address2
			t.text				:note
			t.text 				:free_word

      t.timestamps
		end

		##
		# 下請け業者部門担当者
		# @version 2019/12/18
		#
    create_table :subcontractor_division_clients do |t|
      t.references	:subcontractor_division,	index: false
      t.references	:user,										index: true
      t.string			:name
      t.string			:kana
      t.integer			:title,		limit: 1,		default: 10
      t.string			:tel
      t.string			:email
      t.text				:note
      t.text				:free_word

      t.timestamps
		end

		add_index :subcontractor_division_clients, [:subcontractor_division_id], unique: false, name: 'subcontractor_division_clients_index'

		##
		# 見積書
		# @version 2019/12/18
		#
    create_table :quotes do |t|
      t.date				:date,												comment:'発行日'
      t.date				:expiration,									comment:'発行期限'
      t.string			:subject, 										comment:'件名'
      t.text				:remarks, 										comment:'備考'
      t.text				:memo, 												comment:'メモ'
			t.text				:free_word,										comment:'検索用'
			t.integer 		:price
			t.integer			:attention
			t.text				:pdf_url
			t.integer			:user_id
			t.integer			:status, 											default: 0, null: :false
			t.string			:quote_number
			t.integer			:company_division_client_id,	index: true
			t.integer			:quote_type
			t.integer			:channel
			t.datetime		:deliver_at
			t.integer			:deliver_type
			t.text				:deliver_type_note
			t.references	:division,										foreign_key: true
			t.integer			:discount
			t.integer			:tax_type
			t.integer 		:payment_terms
			t.float				:tax,													default: 1.1
			t.integer			:reception

      t.timestamps
		end

		##
		#	見積書に紐づくモノたち
		# @version 2019/12/18
		#
		create_table :quote_items do |t|
      t.references	:quote
      t.integer			:cost, 					comment:'コスト'
      t.decimal			:gross_profit,	comment:'粗利',	precision: 11,	scale: 8
      t.string			:detail,				comment:'詳細'
			t.string 			:name
			t.integer 		:unit_price
			t.integer			:quantity

      t.timestamps

		end

		##
		#	作業書と外注業者を結びつけるモノ
		# @version 2019/12/18
		#
		create_table :work_subcontractors do |t|
      t.references 	:work, 													index: true
      t.references	:subcontractor_division_client,	index: true
			t.integer 		:status, 												limit: 1, default: 0
			t.text 				:notices
			t.datetime		:order_date
			t.datetime		:delivery_date
			t.string			:delivery_destination

      t.timestamps
		end

		##
		# 作業書と外注業者に結びついている外注業者の詳細
		# @version 2019/12/18
		#
		create_table :work_subcontractor_details do |t|
      t.references	:work_subcontractor,	index: true
			t.string 			:order_contents
			t.text 				:deliver_method
      t.text 				:specification
      t.string 			:count
      t.string 			:number_of_copies
      t.datetime 		:deliver_at
      t.string 			:cost_unit_price
      t.string 			:estimated_cost
      t.string 			:actual_count
      t.string 			:actual_cost
			t.integer 		:status, 							limit: 1, default: 0
			t.references 	:work,								index: true

      t.timestamps
		end

		##
		#	請求書
		#	@version 2019/12/18
		#
		create_table :invoices do |t|
			t.references	:quote
      t.date				:date,				comment:'請求日'
      t.date				:expiration,	comment:'支払い期限'
      t.string			:subject,			comment:'件名'
      t.text				:remarks,			comment:'備考'
      t.text				:memo,				comment:'メモ'
      t.text				:free_word,		comment:'検索用'
			t.text				:attention
			t.string			:pdf_url

      t.timestamps
		end

		##
		# 見積書と作業を結びつける
		#	@version 2019/12/18
		#
		create_table :quote_projects do |t|
      t.references	:quote
			t.references	:project
			t.string			:unit
			t.string			:price
			t.string			:name
			t.string			:unit_price
			t.string			:project_name
			t.text				:remarks

      t.timestamps
		end
		

		##
		# 消耗品
		# @version 2019/12/19
		#
		create_table :expendables do |t|
			t.references	:division
      t.references 	:subcontractor
      t.integer			:status,											default: 0
      t.string			:name
      t.integer			:price,												default: 0,	null:	false
      t.date				:date,												comment:'申請日'
			t.text				:memo
			t.references	:work_subcontractor_detail,		foreign_key: true

      t.timestamps
		end

		##
		#	支払い
		# @version 2019/12/19
		#
		create_table :payments do |t|
      t.references	:subcontractor
      t.references	:work_subcontractor_detail
      t.integer			:price,											default: 0, null: false
			t.date				:date,											comment: '支払日'
			t.references	:expendable,								foreign_key: true

      t.timestamps
		end

		##
		# 目標
		# @version 2019/12/19
		#
		create_table :targets do |t|
      t.references	:division
      t.integer			:target_year,		default: 1
      t.integer			:target_month,	default: 1
      t.integer			:sales,					default: 0
      t.integer			:profit, 				default: 0
      t.integer			:cost,					default: 0

      t.timestamps
		end

		##
		# 利益
		# @version 2019/12/19
		#
		create_table :profits do |t|
      t.references	:company
      t.references	:quote
      t.integer			:price,	default: 0
      t.date				:date,	comment: '請求日'

      t.timestamps
		end

		##
		# 労働
		# @version 2019/12/19
		#
		create_table :labors do |t|
      t.references	:division
      t.text				:memo
      t.integer			:price,	default: 0
      t.date				:date,	comment:'申請日'

      t.timestamps
		end

		##
		#	カタログ
		# @version 2019/12/19
		#
		create_table :catalogs do |t|
      t.string	:name,				comment: '商品名'
      t.text		:description, comment: '商品説明用'
      t.string	:price,				comment: '文言なども入る'
			t.string	:deliver_at,	comment: '文言なども入る'

      t.timestamps
		end

		##
		# 仕事
		# @version 2019/12/19
		#
		create_table :tasks do |t|
      t.date				:date,																	comment: '希望納期'
      t.binary			:data,																	comment: '添付データ'
      t.text				:remarks,																comment: '備考欄'
			t.references	:quote,							foreign_key: true,	comment: 'quoteのid'
			t.references	:catalog,						foreign_key: true,	comment: 'catalogのid'
			t.string			:client_name
			t.string			:client_mail
			t.datetime		:clientlastaccess,	default: DateTime.now
			t.integer 		:will_order,				default: 0

      t.timestamps
		end

		##
		# メッセージ
		# @version 2019/12/19
		#
		create_table :messages do |t|
      t.references	:task,  									index: true
      t.text				:content,									comment: 'チャット内容'
			t.string			:name,										comment: 'チャット送信者'
			t.references 	:user, 										foreign_key: true
			t.references 	:company_division_client,	foreign_key: true

      t.timestamps
		end

		##
		# お問い合わせ
		# @version 2019/12/19
		#
		create_table :inquiries do |t|
      t.references	:quote,  				index: true
      t.integer			:result, 				default: 0
      t.string			:quote_number,	comment: '案件番号'
			t.datetime		:import_time

      t.timestamps
    end
  end
end