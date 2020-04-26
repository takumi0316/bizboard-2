class CreateTableToCards < ActiveRecord::Migration[5.2]
  def change

    create_table :cards, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :company_division, index: true
      t.string     :name,             comment: '名刺名称'

      t.timestamps
    end

    create_table :card_templates, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card,   index: true
      t.integer    :status, limit: 1,   default: 0, comment: 'テンプレートの状態'

      t.timestamps
    end

    create_table :template_details, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card_template, index: true
      t.string     :name,          comments: '名刺カラム名'
      t.string     :font,          comments: 'フォント'
      t.string     :font_size,     comments: 'フォントサイズ(pt)'
      t.string     :font_color,    comments: 'フォントカラー'
      t.string     :coord_x,       comments: '座標(x)'
      t.string     :coord_y,       comments: '座標(y)'
      t.string     :length,        comemnts: '長さ'
      t.string     :line_space,    comments: '行間'

      t.timestamps
    end

    create_table :card_clients, options: 'DEFAULT CHARSET=utf8mb4' do |t|

      t.references :card, index: true
      t.references :company_division, index: true
      t.references :company_division_client, index: true

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
  end
end
