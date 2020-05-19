require 'csv'
require 'nkf'

csv = CSV.generate do |card|
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
  card << headers
	@only_card&.each_with_index do |r, index|
    values = [
      (index + 1),
      r.date,
      r.quote.quote_number,
      r.quote.client&.company_division&.company&.name,
      r.quote.client&.company_division&.name,
      r.quote.subject,
      r.quote.price,
      r.quote.channel_i18n,
      r.quote.reception_i18n,
      r.quote.deliver_type_i18n,
      r.quote.quote_type_i18n
    ]
    card << values
  end
end
NKF::nkf('--sjis -Lw', csv)
csv
