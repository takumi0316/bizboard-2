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

  # マスタ同期
  namespace :masters do
    post :items
    post :pertners
  end
  resources :masters

  # 案件
  resources :projects do
    post :status
  end

  #見積もり
  namespace :quotes do
    post :apipost
  end
  resources :quotes

  # 案件
  namespace :invoices do
    post :apipost
  end
  resources :invoices

  #活動履歴
  resources :activities

  # 作業進捗
  resources :works
  get 'works/:id/directions' => 'works#directions'

  # 作業詳細
  resources :work_details
  resources :work_subcontractors
  resources :work_subcontractor_details

  # 取引先
  resources :companies
  resources :company_divisions
  resources :company_division_clients

  # 外注先
  resources :subcontractors
  resources :subcontractor_divisions
  resources :subcontractor_division_clients

  # 品目
  resources :items

  # 自社部署
  resources :divisions

  # ユーザー管理
  resources :users, only: [:index, :edit, :update, :destroy]

  # サイト設定
  namespace :webhooks do
    get :mfcloud
  end

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
