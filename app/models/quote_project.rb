# == Schema Information
#
# Table name: quote_projects
#
#  id           :bigint           not null, primary key
#  quote_id     :bigint
#  project_id   :bigint
#  unit         :string(191)
#  price        :string(191)
#  name         :string(191)
#  unit_price   :string(191)
#  project_name :string(191)
#  remarks      :text(65535)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class QuoteProject < ApplicationRecord

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

  belongs_to :quote

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

end
