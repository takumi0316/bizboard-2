require 'csv'

CSV.generate(encoding: Encoding::SJIS, row_sep: "\r\n", force_quotes: true) do |csv|
  headers = %w(
    No.
    請求日
    案件番号
    会社名
    部署名
    案件名
    金額
    受注経路
    受注方法
    納品方法
    受注区分
  )
  csv << headers
  @consul&.each_with_index do |r, index|
    values = [
      (index + 1),
      r.date,
      r.quote.quote_number,
      r.quote.client.company_division.company.name,
      r.quote.client.company_division.name,
      r.quote.subject,
      "#{r.quote.price}円",
      r.quote.channel_i18n,
      r.quote.reception_i18n,
      r.quote.deliver_type_i18n,
      r.quote.quote_type_i18n
    ]
    csv << values
  end
end
