# == Schema Information
#
# Table name: project_binds
#
#  id              :bigint(8)        not null, primary key
#  project_id      :bigint(8)
#  posting_state   :integer          default("stapler")
#  print_size      :integer          default("card_size")
#  print_size_note :text(65535)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  price           :integer
#

class ProjectBind < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum posting_state: { stapler: 0, zem: 10, wclip: 20, band: 30, bara: 40, bind: 50, file: 60 }
  enum print_size: { card_size: 0, a4: 10, a3: 20, a2: 30, a1: 40, a0: 50 }

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
