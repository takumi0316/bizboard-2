Rails.application.routes.draw do

  # TOP
  root 'home#index'

  # ユーザー認証
  devise_for :user, path: '/user/auth/google/callback', singular: :user, skip: :sessions, controllers: {
    omniauth_callbacks: :auth_callbacks,
  }

  # サイト設定
  namespace :configs do
    post :activation
    post :create_logo
    post :create_favicon
  end
  resources :configs

  # 目標管理
  resources :targets

  # 案件
  resources :projects

  #見積もり
  namespace :quotes do
    get  :pdf_dl
  end
  resources :quotes do
    post :status
    post :copy
    member do
      get 'wicked_pdf'
    end
  end

  resources :quote_projects, only: [:destroy]

  # 案件
  namespace :invoices do
    post :apipost
  end
  resources :invoices do
    member do
      get 'wicked_pdf'
    end
  end
  #get 'invoices/:id/wicked_pdf' => 'invoices#wicked_pdf'

  #活動履歴
  resources :activities

  # 作業進捗
  resources :works do
    member do
      get :directions
    end
  end

  # 作業詳細
  resources :work_details
  resources :work_subcontractors
  resources :work_subcontractor_details

  # 取引先
  resources :companies do
    collection do
      post :bulk
    end
  end
  resources :company_divisions
  resources :company_division_clients

  # 外注先
  resources :subcontractors do
    collection do
      post :bulk
    end
  end
  resources :subcontractor_divisions
  resources :subcontractor_division_clients

  #外注先支払い情報
  resources :payments

  #取引先請求情報
  resources :profits

  #請求情報
  resources :bills

  #経費入力
  resources :expendables

  #労務費入力
  resources :labors

  # 自社部署
  resources :divisions

  # ユーザー管理
  resources :users, only: [:index, :edit, :update, :destroy]

  # 認証
  devise_scope :user do
    match  :sign_in,        to: 'sessions#index',          as: :sign_in, via: [:get, :post]
    match  :sign_up,        to: 'sessions#new',            as: :sign_up, via: [:get, :post]
    get    :verify,         to: 'sessions#verify',         as: :verify
    post   :confirm,        to: 'sessions#confirm',        as: :confirm
    get    :auth,           to: 'sessions#auth',           as: :auth
    delete :sign_out,       to: 'sessions#destroy',        as: :sign_out
    match  :remind,         to: 'sessions#remind',         as: :remind, via: [:get, :post]
    match  :password_reset, to: 'sessions#password_reset', as: :password_reset, via: [:get, :post]
    get    :inactive,       to: 'sessions#inactive',       as: :inactive
  end

  mount Sidekiq::Web, at: '/sidekiq'

end
