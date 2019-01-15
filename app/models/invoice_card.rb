# == Schema Information
#
# Table name: invoice_cards
#
#  id         :bigint(8)        not null, primary key
#  invoice_id :bigint(8)
#  draft_data :integer          default(0)
#  url        :text(65535)
#  card_type  :integer          default(0)
#  work_type  :integer          default(0)
#  work_time  :integer          default(0)
#  color      :integer          default(0)
#  paper      :integer
#  surface    :integer          default(0)
#  emboss     :integer          default(0)
#

class InvoiceCard < ApplicationRecord

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

  belongs_to :invoice

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
