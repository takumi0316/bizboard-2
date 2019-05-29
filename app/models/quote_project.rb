# == Schema Information
#
# Table name: quote_projects
#
#  id           :bigint(8)        not null, primary key
#  quote_id     :bigint(8)
#  project_id   :bigint(8)
#  price        :string(191)      default("10")
#  unit         :string(191)      default("10")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  name         :string(191)
#  unit_price   :string(191)
#  project_name :string(191)
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
  #belongs_to :project

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
