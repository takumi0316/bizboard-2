# == Schema Information
#
# Table name: project_copies
#
#  id              :bigint(8)        not null, primary key
#  project_id      :bigint(8)
#  posting_state   :integer          default("stapler")
#  draft_split     :integer          default("split_available")
#  draft_restore   :integer          default("restore_necessary")
#  color           :integer          default("original_print")
#  print_size      :integer          default("original_size")
#  print_size_note :text(65535)
#  surface         :integer          default("original_surface")
#  open_type       :integer          default("side_open")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class ProjectCopy < ApplicationRecord

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
  enum draft_split: { split_available: 0, split_unavailable: 10 }
  enum draft_restore: { restore_necessary: 0, restore_unnecessary: 10 }
  
  enum color: { original_print: 0, color_print: 10, monochrome_print: 20 }
  enum print_size: { original_size: 0, a3: 10, a4: 20, print_size_other: 30 }
  enum surface: { original_surface: 0, one_side: 10, both_side: 20 }
  enum open_type: { side_open: 0, upper_open: 10 }

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
