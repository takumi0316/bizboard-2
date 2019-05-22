# == Schema Information
#
# Table name: project_after_processes
#
#  id             :bigint(8)        not null, primary key
#  project_id     :bigint(8)
#  folding        :integer          default("original_folding")
#  stapler        :integer          default("original_stapler")
#  hole           :integer          default("original_hole")
#  hole_note      :text(65535)
#  clip           :integer          default("clip_unnecessary")
#  bind           :integer          default("file_unnecessary")
#  bind_note      :text(65535)
#  back_text      :integer          default("back_text_unnecessary")
#  back_text_note :text(65535)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  note           :text(65535)
#  price          :integer
#

class ProjectAfterProcess < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum folding: { original_folding: 0, z_folding: 10, beta_folding: 20, three_folding: 30, file_folding: 40, no_folding: 50 }
  enum stapler: { original_stapler: 0, upper_left_stapler: 10, upper_right_stapler: 20, left_double_stapler: 30, right_double_stapler: 40, no_stapler: 50 }
  enum hole: { original_hole: 0, hole_necessary: 10, hole_other: 20 }
  enum clip: { clip_unnecessary: 0, clip_necessary: 10, no_clip: 20 }
  enum bind: { file_unnecessary: 0, king_file: 10, flat_file: 20, other_file: 30 }
  enum back_text: { back_text_unnecessary: 0, back_text_necessary: 10 }

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
