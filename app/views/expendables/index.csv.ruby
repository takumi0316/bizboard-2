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
    金額(税抜き)
  )
  csv << column_names
  @csv_data.each_with_index do |r, i|
    column_values = [
      (i + 1),
      r.date,
      r.work_subcontractor_detail&.work_subcontractor&.work&.quote&.quote_number,
      r.subcontractor.name,
      r.division.name,
      r.status_i18n,
      r.work_subcontractor_detail&.work_subcontractor&.work&.quote&.quote_type_i18n,
      r.price,
    ]
    csv << column_values
  end
end
