# == Schema Information
#
# Table name: invoice_scans
#
#  id             :bigint(8)        not null, primary key
#  invoice_id     :bigint(8)
#  posting_state  :integer          default(0)
#  draft_split    :integer          default(0)
#  draft_restore  :integer          default(0)
#  back_cut       :integer          default(0)
#  back_cut_note  :text(65535)
#  color          :integer          default(0)
#  resolution     :integer          default(0)
#  extension      :integer          default(0)
#  size_mix       :integer          default(0)
#  adf            :integer          default(0)
#  odr            :integer          default(0)
#  bookmark       :integer          default(0)
#  edit_file_name :integer          default(0)
#

class InvoiceScan < ApplicationRecord

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
