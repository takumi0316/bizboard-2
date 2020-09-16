# == Schema Information
#
# Table name: project_prints
#
#  id              :bigint(8)        not null, primary key
#  project_id      :bigint(8)
#  draft_data      :integer          default("data_available")
#  url             :text(65535)
#  work_process    :integer          default("work_process_unnecessary")
#  work_type       :integer          default("create_data")
#  work_note       :text(65535)
#  work_time       :integer          default(0)
#  work_price      :integer          default(0)
#  print_work      :integer          default("print_work_unnecessary")
#  color           :integer          default("original_print")
#  print_size      :integer          default("original_size")
#  print_size_note :text(65535)
#  surface         :integer          default("original_surface")
#  open_type       :integer          default("side_open")
#  price           :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class ProjectPrint < ApplicationRecord

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
  enum work_process: { work_process_unnecessary: 0, work_process_necessary: 10 }
  enum print_work: { print_work_unnecessary: 0, print_work_necessary: 10 }
  enum work_type: { create_data: 0, edit_data: 10 }
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
