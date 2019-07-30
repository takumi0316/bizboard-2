require 'csv'

CSV.generate(encoding: Encoding::SJIS, row_sep: "\r\n", force_quotes: true) do |csv|
  column_names = %w(
    取引№
    取引日
    借方勘定科目
    借方補助科目
    借方税区分
    借方部門
    借方金額(円)
    借方税額
    貸方勘定科目
    貸方補助科目
    貸方税区分
    貸方部門
    貸方金額(円)
    貸方税額
    適用
    仕訳メモ
    タグ
    MF仕訳タイプ
    決算整理仕訳
    作成日時
    最終更新日時
  )
  csv << column_names
  @csv_data.each_with_index do |r, i|
    if r.tax_type == 'exemption'
      @price = (r.price).floor
      @I列 = '立替金'
      @K列 = '対象外'
    else
      @price = (r.price * SiteConfig.consumption_tax).floor
      @I列 = '売上高'
      @K列 = '課税売上 8%'
    end
    column_values = [
      (i + 1),
      r.invoice.date,
      '売掛金',
      r.client.company_division.company.name,
      '対象外',
      '',
      (@price),
      '',
      (@I列),
      r.quote_type_i18n,
      (@K列),
      r.division.name,
      (@price),
      '',
      r.quote_number,
      '',
      '',
      '',
      '',
      '',
      '',
    ]
    csv << column_values
  end
end
