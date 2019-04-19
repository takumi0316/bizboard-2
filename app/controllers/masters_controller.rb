##
# Masters Controller
#
class MastersController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # コンポーネント一覧
  expose(:site_configs) { SiteConfig.get_all }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  # 管理者認証
  before_action :authenticate_admin
  # MFクラウド認証
  before_action :authenticate_mfcloud

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # マスター同期
  # @version 2018/06/10
  #
  def index

    add_breadcrumb 'マスター同期'
  end

  ##
  # 品目同期
  # @version 2018/06/10
  #
  def items

    client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)
    items = client.items
    meta = items.all.meta

    (1..meta.total_pages).each do |page|

      collection = items.all(page: page).collection

      break if collection.blank?

      collection.each do |item|

        next if Item.exists?(mf_item_id: item.id)

        Item.create!(
          mf_item_id: item.id,
          code: item.code,
          name: item.name,
          note: item.detail,
          unit_price: item.unit_price.to_i,
          unit: item.unit,
          quantity: item.quantity.to_i,
          excise: item.excise,
        )
      end
    end

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '品目を同期しました'}}
  end

  ##
  # 取引先同期
  # @version 2018/06/10
  #
  def pertners

    client = MfCloud::Invoice::Client.new(access_token: current_user.mf_access_token)
    partners = client.partners
    meta = partners.all.meta

    (1..meta.total_pages).each do |page|

      collection = partners.all(page: page).collection

      break if collection.blank?

      collection.each do |partner|

        company = Company.find_or_initialize_by(mf_company_id: partner.id)

        if company.new_record?

          company.mf_company_id = partner.id
          company.name = partner.name
          company.kana = partner.name_kana
          company.save!
        end

        partner.departments.collection.each do |department|

          company_division = CompanyDivision.find_or_initialize_by(mf_company_division_id: department.id)
          company_division.company_id = company.id
          company_division.prefecture_id = Prefecture.find_by(name: department.prefecture).id if department.prefecture.present?
          company_division.address1 = department.address1
          company_division.address2 = department.address2
          company_division.name = department.name
          company_division.tel = department.tel
          company_division.zip = department.zip
          company_division.save!
        end
      end
    end

    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: '取引先を同期しました'}}
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
