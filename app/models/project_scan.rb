# == Schema Information
#
# Table name: project_scans
#
#  id             :bigint(8)        not null, primary key
#  project_id     :bigint(8)
#  posting_state  :integer          default("stapler")
#  print_size     :integer          default("card_size")
#  draft_split    :integer          default("split_available")
#  draft_restore  :integer          default("restore_necessary")
#  back_cut       :integer          default("back_cut_unnecessary")
#  back_cut_note  :text(65535)
#  color          :integer          default("monochrome_print")
#  resolution     :integer          default("dpi_200")
#  file_extension :integer          default("jpg")
#  size_mix       :integer          default("all_same")
#  adf            :integer          default("adf_available")
#  odr            :integer          default("odr_available")
#  bookmark       :integer          default("bookmark_necessary")
#  edit_file_name :integer          default("edit_filename_necessary")
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class ProjectScan < ApplicationRecord

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

  enum print_size: { card_size: 0, a4: 10, a3: 20, a2: 30, a1: 40, a0: 50 }
  enum back_cut: { back_cut_unnecessary: 0, back_cut_necessary: 10 }
  enum color: { monochrome_print: 0, gray_scale: 10, color_print: 20 }
  enum resolution: { dpi_200: 0, dpi_300: 10, dpi_400: 20 }
  enum file_extension: { jpg: 0, pdf: 10, png: 20 }
  enum size_mix: { all_same: 0, other_1: 10, other_10: 20, other: 30 }
  enum adf: { adf_available: 0, adf_unavailable: 10 }
  enum odr: { odr_available: 0, odr_unavailable: 10 }
  enum bookmark: { bookmark_necessary: 0, bookmark_unnecessary: 10 }
  enum edit_file_name: { edit_filename_necessary: 0, edit_filename_unnecessary: 10 }

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
