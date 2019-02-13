class SyncPartnersJob < ApplicationJob

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  extend MiniScheduler::Schedule

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  every 24.hours

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  ##
  # 実行
  # @version 2018/06/10
  #
  def perform

    user = User.mf_expires_in.first

    return nil if user.blank?

    client = MfCloud::Invoice::Client.new(access_token: user.mf_access_token)
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
  end
end
