# == Schema Information
#
# Table name: project_binding_works
#
#  id                  :bigint(8)        not null, primary key
#  project_id          :bigint(8)
#  bind_type           :integer          default("original_bind_type")
#  cross_front         :text(65535)
#  cross_back          :text(65535)
#  cross_color         :integer          default("black_cross")
#  wrap_front          :text(65535)
#  wrap_back_text      :integer          default("wrap_back_text_necessary")
#  stitching_paper     :text(65535)
#  secret_stitch       :integer          default("normal_secret_stitch")
#  secret_stitch_paper :integer          default("stitch_paper_necessary")
#  radio_stitch        :integer          default("radio_stitch_necessary")
#  radio_cut           :integer          default("radio_cut_necessary")
#  radio_cut_note      :text(65535)
#  double_doors        :text(65535)
#  gold_letter         :text(65535)
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  note                :text(65535)
#  price               :integer
#

class ProjectBindingWork < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  enum bind_type: { original_bind_type: 0, cross_bind_type: 10, wrap_bind_type: 20, stitching_bind_type: 30, secret_bind_type: 40, radio_bind_type: 50, double_door_bind_type: 60, gold_letter_bind_type: 70, no_bind_type: 80, other_bind_type: 90 }
  enum cross_color: { black_cross: 0, white_cross: 10 }
  enum wrap_back_text: { wrap_back_text_necessary: 0, wrap_back_text_unnecessary: 10 }
  enum secret_stitch: { normal_secret_stitch: 0, triangle_secret_stitch: 10 }
  enum secret_stitch_paper: { stitch_paper_necessary: 0, stitch_paper_unnecessary: 10 }
  enum radio_stitch: { radio_stitch_necessary: 0, radio_stitch_unnecessary: 10 }
  enum radio_cut: { radio_cut_necessary: 0, radio_cut_unnecessary: 10 }

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
