# == Schema Information
#
# Table name: inquiries
#
#  id           :bigint(8)        not null, primary key
#  quote_id     :bigint(8)
#  division_id  :bigint(8)
#  result       :integer          default("unknown_quote_number")
#  quote_number :string(191)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

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
  belongs_to :quote, optional: true

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  #csv読み込んでcsv案件の品目コードを参照してfactoryの案件に品目を紐づける処理
  def self.import_bpr(file)

    header_converter = lambda { |h| HEADER_TO_SYM_MAP[h] }

    csv = CSV.read(file.path, headers: :first_row, header_converters: header_converter, converters: :integer, skip_blanks: true, encoding: 'UTF-8')

    group = csv.group_by{|u| u[:project_number] }

    group.each do |row,r|

      quote = Quote.all.find_by(quote_number: row)

      unless quote.blank?

        unless r[1][:total_price] === quote.price
          Inquiry.where(quote_number: quote.quote_number).destroy_all
          Inquiry.create!(quote_id: quote.id, result: 10, quote_number: row, division_id: 5)
          next
        end

        quote_project = []

        # 同じ案件番号の内容でeach処理
        begin
          r.each do |ri|
            project = Project.all.find_by(code: ri[:project_code])

            unless project.blank?
              quote_project << QuoteProject.new(quote_id: quote.id, project_id: project.id, price: ri[:price], unit: 1, name: project.name , unit_price: ri[:price] )
              #QuoteProject.create!(quote_id: quote.id, project_id: project.id, price: ri[:price], unit: 1, name: project.name , unit_price: ri[:price] )
            else
              raise NoMethodError
            end
          end
          QuoteProject.import quote_project
          Inquiry.where(quote_number: quote.quote_number).destroy_all
          Inquiry.create!(quote_id: quote.id, result: 30, quote_number: row, division_id: 5)
        rescue
          Inquiry.where(quote_number: quote.quote_number).destroy_all
          Inquiry.create!(quote_id: quote.id, result: 20, quote_number: row, division_id: 5)
          QuoteProject.where(quote_id: quote.id).destroy_all
        end

      else
        Inquiry.create!(quote_number: row, result: 0, import_time: Time.now)
        next
      end
    end
  end

  #csv読み込んでcsv案件の品目コードを参照してfactoryの案件に品目を紐づける処理
  def self.import_erp(file)

    header_converter = lambda { |h| HEADER_TO_SYM_MAP[h] }

    csv = CSV.read(file.path, headers: :first_row, header_converters: header_converter, converters: :integer, skip_blanks: true, encoding: 'UTF-8')

    group = csv.group_by{|u| u[:project_number] }

    group.each do |row,r|

      quote = Quote.all.find_by(quote_number: row)

      unless quote.blank?

        unless r[1][:total_price] === quote.price
          Inquiry.where(quote_number: quote.quote_number).destroy_all
          Inquiry.create!(quote_id: quote.id, result: 10, quote_number: row, division_id: 7)
          next
        end

        # 同じ案件番号の内容でeach処理
        begin
          r.each do |ri|

            project = Project.all.find_by(code: ri[:project_code])

            unless project.blank?
              QuoteProject.create!(quote_id: quote.id, project_id: project.id, price: ri[:price], unit: 1, name: project.name , unit_price: ri[:price] )
            else
              raise NoMethodError
            end
          end
          Inquiry.where(quote_number: quote.quote_number).destroy_all
          Inquiry.create!(quote_id: quote.id, result: 30, quote_number: row, division_id: 7)
        rescue
          Inquiry.where(quote_number: quote.quote_number).destroy_all
          Inquiry.create!(quote_id: quote.id, result: 20, quote_number: row, division_id: 7)
          QuoteProject.where(quote_id: quote.id).destroy_all
        end

      else
        Inquiry.create!(quote_number: row, result: 0, import_time: Time.now)
        next
      end
    end
  end


end
