class RemakeTable < ActiveRecord::Migration[5.2]

  def up

    drop_table :cards, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :company, index: true
      t.string     :name,    comment: '名刺名称'
      t.text       :free_word

      t.timestamps
    end

    create_table :card_templates, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card,   index: true
      t.integer    :status, limit: 1,   default: 0, comment: 'テンプレートの状態'

      t.timestamps
    end

    drop_table :card_templates, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card,   index: true
      t.integer    :status, limit: 1,   default: 0, comment: 'テンプレートの状態'

      t.timestamps
    end

    drop_table :template_details, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card_template, index: true
      t.string     :name,          comment: '名刺カラム名'
      t.string     :font,          comment: 'フォント'
      t.string     :font_size,     comment: 'フォントサイズ(pt)'
      t.string     :font_color,    comment: 'フォントカラー'
      t.string     :coord_x,       comment: '座標(x)'
      t.string     :coord_y,       comment: '座標(y)'
      t.string     :length,        comment: '長さ'
      t.string     :line_space,    comment: '行間'

      t.timestamps
    end

    drop_table :card_clients, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card, index: true
      t.references :company_division, index: true
      t.references :company_division_client, index: true
      t.text       :free_word
      t.integer    :status, limit: 1, default: 0

      t.timestamps
    end

    drop_table :client_templates, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card_client,   index: true
      t.references :card_template, index: true

      t.timestamps
    end

    drop_table :client_template_values, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :client_template, index: true
      t.references :template_detail, index: true
      t.string     :value,           comment: '入力値'

      t.timestamps
    end

    drop_table :task_card_clients, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :task, index: true
      t.references :quote, index: true
      t.references :card_client, index: true
      t.string     :shipping_address
      t.integer    :count

      t.timestamps
    end

    add_column :company_division_clients, :default_front_template,   :string, comment: 'デフォルトのテンプレ(表)'
    add_column :company_division_clients, :default_reverse_template, :string, comment: 'デフォルトのテンプレ(裏)'

    create_table :card_templates, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :company,          index: true
      t.string     :name, limit: 191, comment: 'テンプレートの名前'
      t.integer    :status, limit: 1, default: 0, comment: '表・裏'

      t.timestamps
    end

    create_table :card_layouts, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.string :name, limit: 191

      t.timestamps
    end

    create_table :template_layouts, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card_template, index: true
      t.references :card_layout,   index: true

      t.timestamps
    end

    create_table :content_logos, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.string :name, limit: 191

      t.timestamps
    end

    create_table :content_flags, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.string :name, limit: 191

      t.timestamps
    end

    create_table :layout_contents, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :content_logo,       index: true
      t.references :content_flag,       index: true
      t.string     :name,               comment: 'レイアウトの名前'
      t.string     :x_coordinate,       comment: '座標(X)'
      t.string     :y_coordinate,       comment: '座標(Y)'
      t.string     :font_size,          comment: 'フォントサイズ'
      t.string     :layout_length,      comment: '描画領域'
      t.string     :letter_spacing,     comment: '文字間'
      t.string     :reduction_rate,     comment: '縮小率'
      t.integer    :is_reduction_rated, comment: '縮小するか否か'
      t.integer    :layout_type,        comment: 'テキストかテキストエリアか'
      t.integer    :font_family,        comment: '書体'
      t.integer    :font_color,         comment: 'フォントカラー'

      t.timestamps
    end

    create_table :card_informations, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :company_division_client, index: true
      t.string     :text_value,              limit: 191
      t.text       :textarea_value
      t.integer    :layout_type,             comment: 'レイアウトと結びつける'

      t.timestamps
    end

  end

  def down

    create_table :cards, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :company, index: true
      t.string     :name,    comment: '名刺名称'
      t.text       :free_word

      t.timestamps
    end

    create_table :template_details, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card_template, index: true
      t.string     :name,          comment: '名刺カラム名'
      t.string     :font,          comment: 'フォント'
      t.string     :font_size,     comment: 'フォントサイズ(pt)'
      t.string     :font_color,    comment: 'フォントカラー'
      t.string     :coord_x,       comment: '座標(x)'
      t.string     :coord_y,       comment: '座標(y)'
      t.string     :length,        comment: '長さ'
      t.string     :line_space,    comment: '行間'

      t.timestamps
    end

    create_table :card_clients, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card, index: true
      t.references :company_division, index: true
      t.references :company_division_client, index: true
      t.text       :free_word
      t.integer    :status, limit: 1, default: 0

      t.timestamps
    end

    create_table :client_templates, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card_client,   index: true
      t.references :card_template, index: true

      t.timestamps
    end

    create_table :client_template_values, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :client_template, index: true
      t.references :template_detail, index: true
      t.string     :value,           comment: '入力値'

      t.timestamps
    end

    create_table :task_card_clients, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :task, index: true
      t.references :quote, index: true
      t.references :card_client, index: true
      t.string     :shipping_address
      t.integer    :count

      t.timestamps
    end

    remove_column :company_division_clients, :default_front_template
    remove_column :company_division_clients, :default_reverse_template

    drop_table :card_templates, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :company,          index: true
      t.string     :name, limit: 191, comment: 'テンプレートの名前'
      t.integer    :status, limit: 1, default: 0, comment: '表・裏'

      t.timestamps
    end

    drop_table :card_layouts, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.string :name, limit: 191

      t.timestamps
    end

    drop_table :template_layouts, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card_template, index: true
      t.references :card_layout,   index: true

      t.timestamps
    end

    drop_table :content_logos, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.string :name, limit: 191

      t.timestamps
    end

    drop_table :content_flags, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.string :name, limit: 191

      t.timestamps
    end

    drop_table :layout_contents, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :content_logo,       index: true
      t.references :content_flag,       index: true
      t.string     :name,               comment: 'レイアウトの名前'
      t.string     :x_coordinate,       comment: '座標(X)'
      t.string     :y_coordinate,       comment: '座標(Y)'
      t.string     :font_size,          comment: 'フォントサイズ'
      t.string     :layout_length,      comment: '描画領域'
      t.string     :letter_spacing,     comment: '文字間'
      t.string     :reduction_rate,     comment: '縮小率'
      t.integer    :is_reduction_rated, comment: '縮小するか否か'
      t.integer    :layout_type,        comment: 'テキストかテキストエリアか'
      t.integer    :font_family,        comment: '書体'
      t.integer    :font_color,         comment: 'フォントカラー'
      
      t.timestamps
    end

    drop_table :card_informations, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :company_division_client, index: true
      t.string     :text_value,              limit: 191
      t.text       :textarea_value
      t.integer    :layout_type,             comment: 'レイアウトと結びつける'

      t.timestamps
    end

  end

end
