class CreateTableToCards < ActiveRecord::Migration[5.2]
  def change

    create_table :cards do |t|

      t.references :company_division, index: true
      t.string     :name,             comment: '名刺名称'

      t.timestamps
    end

    create_table :card_templates do |t|

      t.references :card,   index: true
      t.integer    :status, limit: 1,   default: 0, comment: 'テンプレートの状態'

      t.timestamps
    end

    create_table :template_details do |t|

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

    create_table :card_clients do |t|

      t.references :card, index: true
      t.references :company_division, index: true
      t.references :company_division_client, index: true

      t.timestamps
    end

    create_table :client_templates do |t|

      t.references :card_client,   index: true
      t.references :card_template, index: true

      t.timestamps
    end

    create_table :client_template_values do |t|

      t.references :client_template, index: true
      t.references :template_detail, index: true
      t.string     :value,           comment: '入力値'

      t.timestamps
    end
  end
end
