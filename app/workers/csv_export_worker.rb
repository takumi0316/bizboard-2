class CsvExportWorker
  include Sidekiq::Worker
  sidekiq_options retry: false
  require 'csv'

  def perform(id)

    p "CSVを書き出し中です。"
    bom = "\uFEFF"
    ct = CardTemplate.find(id)
    ct_company = ct.company
    download_csv = CSV.generate(bom) do |csv|

      # ヘッダー情報
      headers = []
      headers << 'No.'
      headers << 'テンプレートID'
      headers << 'デフォルトレイアウトID(表)'
      headers << 'デフォルトレイアウトID(裏)'
      headers << 'ID'
      headers << '会社名'
      headers << '部署ID'
      headers << '部署名'
      headers << '担当者ID'
      headers << '担当者名'

      # flagをuniqにするため
      flags = []
      ct.card_layouts.each { |r| r.contents.each { |c| flags << c.content_flag_id } }

      flags.uniq!
      flags.each { |f| headers << ContentFlag.find(f).name }
      csv << headers

      ct.company.divisions.each do |division|
        division.clients.each_with_index do |client, index|

          head_template_layouts = TemplateLayout.where(card_template_id: id).where(status: :head)
          head_result = head_template_layouts.pluck(:card_layout_id)
          head_layout_id = head_result.include?(client.head_layout_id) ? client.head_layout_id : head_result[0]

          tail_template_layouts = TemplateLayout.where(card_template_id: id).where(status: :tail)
          tail_result = tail_template_layouts.pluck(:card_layout_id)
          tail_layout_id = tail_result.include?(client.tail_layout_id) ? client.tail_layout_id : tail_result[0]

          values = []
          values << index + 1
          values << ct.id
          values << head_layout_id
          values << tail_layout_id
          values << ct_company.id
          values << ct_company.name
          values << division.id
          values << division.name
          values << client.id
          values << client.name
          flags.each do |f|

            flag = ContentFlag.find(f)
            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client.id, content_flag_id: f)
            values << layout_value.text_value if flag.text?
            values << layout_value.textarea_value if flag.text_area?
            if flag.image?
              if layout_value.upload_id.present?
                values << layout_value.upload_id
              else
                values << '画像なし'
              end
            end
          end

          csv << values
        end
      end
    end

    # send_data download_csv, filename: '担当者情報ダウンロード.csv', type: :csv

    File.open("#{ct.name}_担当者情報.csv", 'w') do |file|
      file.write(download_csv)
    end

    # fullpath = "#{Rails.root}/#{ct.name}_担当者情報.csv"
    # File.delete(fullpath)
    p 'CSVの書き出しが終わりました。'
  rescue => e

    p "エラーがおきました。#{ e.message }"
  end
end
