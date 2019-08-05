class AddColumnCompanyDivisionClients < ActiveRecord::Migration[5.2]
  def up

    add_column :company_division_clients, :status, :integer, limit: 1,   default: 0, comment: '承認設定'
    add_column :company_division_clients, :user_type, :integer, limit: 1,   default: 0, comment: 'ユーザー区分'
    add_column :company_division_clients, :password_digest, :string, limit: 191, index: true, comment: '暗号化済パスワード'
    add_column :company_division_clients, :provider, :string, limit: 191, comment: '登録元SNS'
    add_column :company_division_clients, :uid, :string, limit: 191, comment: '登録元SNSユーザーID'
    add_column :company_division_clients, :sign_in_count, :integer, limit: 4, default: 0, comment: 'ログイン回数'
    add_column :company_division_clients, :current_sign_in_at, :datetime, comment: 'ログイン日時'
    add_column :company_division_clients, :last_sign_in_at, :datetime, comment: '最終ログイン日時'
    add_column :company_division_clients, :current_sign_in_ip, :string, limit: 191, comment: 'ログイン元IP'
    add_column :company_division_clients, :last_sign_in_ip, :string, limit: 191, comment: '最終ログイン元IP'
    add_column :company_division_clients, :remember_created_at, :datetime, comment: '継続ログイン情報作成日時'
    add_column :company_division_clients, :confirmation_token, :string, comment: '認証トークン'
    add_column :company_division_clients, :confirmed_at, :datetime, comment: '承認日時'
    add_column :company_division_clients, :confirmation_sent_at, :datetime, comment: '認証トークン作成日時'
    add_column :company_division_clients, :unconfirmed_email, :string, comment: '承認待時メール送信先'
  end
end
