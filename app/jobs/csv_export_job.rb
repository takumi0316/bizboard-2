class CsvExportJob < ApplicationJob
  queue_as :default
  require 'csv'

  def perform(card_template)

    bom = "\uFEFF"
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
      card_template.card_layouts.map { |r| r.contents.map { |c| flags << c.content_flag_id } }

      flags.uniq!
      flags.map { |f| headers << ContentFlag.find(f).name }
      csv << headers

      card_template.company.divisions.each do |division|
        division.clients.each_with_index do |client, index|

          head_layout_id = ''
          head_result = card_template.template_layouts.where(status: :head).map { |head| client.head_layout_id == head.card_layout_id ? true : false }

          if head_result.include?(true)

            head_layout_id = client.head_layout_id
          else

            head_layout_id = card_template.template_layouts.where(status: :head).first.card_layout_id
          end

          tail_layout_id = ''
          tail_result = card_template.template_layouts.where(status: :tail).map { |tail| client.tail_layout_id == tail.card_layout_id ? true : false }

          if tail_result.include?(true)

            tail_layout_id = client.tail_layout_id
          else

            tail_layout_id = card_template.template_layouts.where(status: :tail).first.card_layout_id
          end

          values = []
          values << index + 1
          values << card_template.id
          values << head_layout_id
          values << tail_layout_id
          values << card_template.company.id
          values << card_template.company.name
          values << division.id
          values << division.name
          values << client.id
          values << client.name
          flags.map do |f|

            flag = ContentFlag.find(f)
            layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client.id, content_flag_id: f)
            values << layout_value.text_value if flag.text?
            values << layout_value.textarea_value if flag.text_area?
            values << layout_value.upload_id if flag.image?
          end

          csv << values
        end
      end

    end

    send_data download_csv, filename: '担当者情報ダウンロード.csv', type: :csv
  end
end
