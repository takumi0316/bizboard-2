# == Schema Information
#
# Table name: users
#
#  id                   :bigint(8)        not null, primary key
#  division_id          :bigint(8)
#  name                 :string(191)
#  email                :string(191)
#  comment              :text(65535)
#  status               :integer          default("inactive")
#  user_type            :integer          default("general")
#  password_digest      :string(191)
#  provider             :string(191)
#  uid                  :string(191)
#  sign_in_count        :integer          default(0)
#  current_sign_in_at   :datetime
#  last_sign_in_at      :datetime
#  current_sign_in_ip   :string(191)
#  last_sign_in_ip      :string(191)
#  remember_created_at  :datetime
#  confirmation_token   :string(191)
#  confirmed_at         :datetime
#  confirmation_sent_at :datetime
#  unconfirmed_email    :string(191)
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  mf_access_token      :string(191)
#  mf_token_expires_in  :datetime
#  mf_refresh_token     :string(191)
#

class User < ApplicationRecord

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  # パスワード暗号化
  has_secure_password
  # MD5
  include GenerateKey
  
  devise :trackable, :rememberable, :omniauthable, :timeoutable, :confirmable

  #----------------------------------------
  #  ** Constants **
  #----------------------------------------

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  #----------------------------------------
  #  ** Enums **
  #----------------------------------------

  # 登録状態
  enum status: { inactive: 0, active: 10 }

  # ユーザー区分
  enum user_type: { general: 0, admin: 10 }

  #----------------------------------------
  #  ** Validations **
  #----------------------------------------

  validates :name,  presence: true, length: { in: 1..SystemConfig.native_database_string_limit }, if: :name?
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :user_type, inclusion: { in: User.user_types.keys }, if: :user_type?
  validates :status, inclusion: { in: User.statuses.keys }, if: :status?

  #----------------------------------------
  #  ** Associations **
  #----------------------------------------

  # 自社部署
  belongs_to :division, optional: true

  # 記事
  has_many :articles, -> { order(id: :desc) }

  # 画像
  has_one_attached :image, dependent: :detach

  #----------------------------------------
  #  ** Delegates **
  #----------------------------------------

  #----------------------------------------
  #  ** Scopes **
  #----------------------------------------

  # 画像のN+1回避(eager load)
  scope :with_eager_loaded_image, -> { eager_load(image_attachment: :blob) }

  scope :mf_expires_in, -> { where('mf_token_expires_in > ?', Time.now) }

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  # メールアドレス整形
  before_validation { self.email = email.downcase }

  # 仮パスワード発行
  before_validation :password_generate, unless: :password_digest?

  # deviseによるメール認証を行わない
  before_save :skip_confirmation_notification!

  ##
  # 仮パスワードを生成する
  # @version 2018/06/10
  #
  def password_generate

    self.password = self.password_confirmation = generate_key(self.email)
  end
end
