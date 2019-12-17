require 'csv'

class Inquiry < ApplicationRecord
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  HEADER_TO_SYM_MAP = {
    'ID' => :id,
    '部名' => :department_name,
    '部Gr名' => :department_gr_name,
    '部Gr' => :department,
    '起案者' => :user,
    '受付No' => :project_number,
    'コピー･製本' => :copy,
    '連番' => :code,
    '受付時間' => :start_time,
    '作業完了時間' => :end_time,
    'コピー品名コード／製本コード' => :project_code,
    'コピー原稿枚数／製本名称' => :project_name,
    'コピー部数／頁数/１冊' => :number_of_project,
    'コピー枚数合計／冊数' => :project_count,
    '値引き前金額' => :price,
    '値引き額' => :discount,
    'コピー金額／製本金額' => :project_price,
    '合計金額' => :total_price,
    '件名' => :subject,
  }


  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum result: { unknown_quote_number: 0, wrong_quote_price: 10, unknown_project_number: 20, complete: 30 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # quote
  belongs_to :quote

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  def self.import(file)
    # ヘッダー情報をHEADER_TO_SYM_MAPに置き換える準備
    header_converter = lambda { |h| HEADER_TO_SYM_MAP[h] }
    # csvを読み込む(ヘッダー情報はHEADER_TO_SYM_MAPで指定した内容に置き換わる)
    csv = CSV.read(file.path, headers: :first_row, header_converters: header_converter, converters: :integer, skip_blanks: true, encoding: 'UTF-8')
    # project_number(案件番号)でgroup_by
    group = csv.group_by{|u| u[:project_number] }
    # 案件番号毎にeach処理
    group.each do |row,r|
      # csvと同じ案件番号のquote_idを探す
      quote = Quote.all.find_by(quote_number: row)
      # 案件番号あるならeach
      unless quote.blank?
        # 同じ案件番号の内容でeach処理
        r.each do |ri|
          # csvの品目コードと同じ品目を探す
          project = Project.all.find_by(code: ri[:project_code])
          # 品目あれば紐付け処理
          unless project.blank?
            QuoteProject.create!(quote_id: quote.id, project_id: project.id, price: ri[:price], unit: 1, name: project.name , unit_price: ri[:price] )

          # 案件番号無かったエラー処理書く事(else)
          end
        end
        Inquiry.create!(quote_id: quote.id, result: 30, quote_number: row, import_time: Date.today.to_time)

      # 案件番号無かったエラー処理書く事(else)
      end
    end
  end

end
