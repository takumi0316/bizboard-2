# == Schema Information
#
# Table name: invoices
#
#  id                     :bigint(8)        not null, primary key
#  user_id                :bigint(8)
#  company_unit_client_id :bigint(8)
#  name                   :string(191)
#  description            :text(65535)
#  invoice_category       :integer          default(0)
#  invoice_count          :integer          default(0)
#  invoice_type           :integer          default(0)
#  channel                :integer          default(0)
#  deliver_at             :datetime
#  deliver_type           :integer          default(0)
#  deliver_type_note      :text(65535)
#  note                   :text(65535)
#

class Invoice < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :user, optional: true
  belongs_to :client, optional: true, class_name: 'CompanyUnitClient'

  has_one  :bind,    class_name: 'InvoiceBind',    dependent: :destroy
  has_one  :card,    class_name: 'InvoiceCard',    dependent: :destroy
  has_one  :copy,    class_name: 'InvoiceCopy',    dependent: :destroy
  has_one  :print,   class_name: 'InvoicePrint',   dependent: :destroy
  has_one  :scan,    class_name: 'InvoiceScan',    dependent: :destroy

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
