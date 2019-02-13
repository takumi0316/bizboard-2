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

  # 案件
  resources :projects

  # 取引先
  resources :companies
  resources :company_divisions
  resources :company_division_clients

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
