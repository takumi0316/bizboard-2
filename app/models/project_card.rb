# == Schema Information
#
# Table name: project_cards
#
#  id         :bigint           not null, primary key
#  project_id :bigint
#  draft_data :integer          default("data_available")
#  url        :text(65535)
#  card_type  :integer          default("template")
#  work_type  :integer          default("create_design")
#  work_time  :integer          default(0)
#  work_price :integer          default(0)
#  color      :integer          default("original_print")
#  paper      :integer          default("coc_413")
#  surface    :integer          default("both_side")
#  emboss     :integer          default("emboss_necessary")
#  price      :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ProjectCard < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum draft_data: { data_available: 0, data_unavailable: 10 }
  enum card_type: { template: 0, special: 10 }
  enum work_type: { create_design: 0, edit_design: 10, create_data: 20, edit_data: 30 }
  enum color: { original_print: 0, color_print: 10, monochrome_print: 20 }
  enum paper: { coc_413: 0, noble: 10, r_55: 20, white_prince: 30, nouveau: 40, snow: 50, top130: 60, prince: 70, cream: 80, colorcopy200g: 90, colorcopy250g: 100, elite: 110, prince_coc: 120, ltg: 121 }
  enum surface: { both_side: 0, one_side: 10 }
  enum emboss: { emboss_necessary: 0, emboss_unnecessary: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  belongs_to :project

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
