require 'csv'

CSV.generate(encoding: Encoding::SJIS, row_sep: "\r\n", force_quotes: true) do |csv|
  column_names = %w(
    №
    申請日
    案件番号
    仕入先
    負担部署
    勘定科目
    セグメント
    金額(税込)
  )
  csv << column_names
  # 金額を税込みに変更する
  # 税率が低い過去のものも1.1にする
  @csv_data.each_with_index do |r, i|
    column_values = [
      (i + 1),
      r.date,
      r.work_subcontractor&.work&.quote&.quote_number,
      r.subcontractor.name,
      r.division.name,
      r.status_i18n,
      r.work_subcontractor&.work&.quote&.quote_type_i18n,
      (r.price.to_i * 1.1).floor,
    ]
    csv << column_values
  end
end
