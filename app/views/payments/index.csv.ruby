require 'csv'

CSV.generate(encoding: Encoding::SJIS, row_sep: "\r\n", force_quotes: true) do |csv|
  column_names = %w(
    #データ区分
    #識別コード
    #コード区分
    #作成日
    #勘定日(自)
    #勘定日(至)
    #実行日
    #銀行番号
    #銀行名
    #支店番号
    #支店名
    #預金種目
    #口座番号
    #口座名
  )
  csv << column_names
  @csv_data.each_with_index do |r, i|
    data_record = [
      '', #データ区分
      '', #照会コード
      '', #勘定日
      '', #起算日
      '', #金額
      '', #うち他店券金額
      '', #振込依頼人コード
      '', #振込依頼人名
      '', #仕向銀行名
      '', #仕向店名
      '', #取消区分
      '', #EDI情報
    ]
    csv << data_record
  end

  trailer_record = [
    '', #データ区分
    '', #振込合計件数
    '', #振込合計金額
    '', #取消合計件数
    '', #取消合計金額
  ]
  csv << trailer_record

  end_record = [
    '', #データ番号
    '', #数字
    '', #レコード種別
    '', #設定範囲
    '', #備考
  ]
  csv << end_record
end