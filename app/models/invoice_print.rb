# == Schema Information
#
# Table name: invoice_prints
#
#  id                  :bigint(8)        not null, primary key
#  invoice_id          :bigint(8)
#  draft_data          :integer          default(0)
#  url                 :text(65535)
#  work_process        :integer          default(0)
#  work_type           :integer          default(0)
#  work_note           :text(65535)
#  work_time           :integer          default(0)
#  print_work          :integer          default(0)
#  color               :integer          default(0)
#  print_size          :integer          default(0)
#  print_size_note     :text(65535)
#  surface             :integer          default(0)
#  open_type           :integer          default(0)
#  folding             :integer          default(0)
#  stapler             :integer          default(0)
#  hole                :integer          default(0)
#  hole_note           :text(65535)
#  clip                :integer          default(0)
#  bind                :integer          default(0)
#  bind_note           :text(65535)
#  back_text           :integer          default(0)
#  back_text_note      :text(65535)
#  bind_type           :integer          default(0)
#  cross_front         :text(65535)
#  cross_back          :text(65535)
#  cross_color         :integer          default(0)
#  wrap_front          :text(65535)
#  wrap_back_text      :integer          default(0)
#  stitching_paper     :text(65535)
#  secret_stitch       :integer          default(0)
#  secret_stitch_paper :text(65535)
#  radio_stitch        :integer          default(0)
#  radio_cut           :integer          default(0)
#  radio_cut_note      :text(65535)
#  double_doors        :text(65535)
#  gold_letter         :text(65535)
#

class InvoicePrint < ApplicationRecord

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
