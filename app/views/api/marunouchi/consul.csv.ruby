require 'csv'

mappings = {
  "\u{00A2}" => "\u{FFE0}",
  "\u{00A3}" => "\u{FFE1}",
  "\u{00AC}" => "\u{FFE2}",
  "\u{2016}" => "\u{2225}",
  "\u{2012}" => "\u{FF0D}",
  "\u{301C}" => "\u{FF5E}"
}

CSV.generate do |csv|
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
      r.date.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8),
      r.quote.quote_number.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8),
      r.quote.client&.company_division&.company&.name.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8),
      r.quote.client&.company_division&.name.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8),
      r.quote.subject.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8),
      r.quote.price.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8),
      r.quote.channel_i18n.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8),
      r.quote.reception_i18n.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8),
      r.quote.deliver_type_i18n.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8),
      r.quote.quote_type_i18n.encode(Encoding::Windows_31J, undef: :replace).encode(Encoding::UTF_8)
    ]
    csv << values
  end
end
