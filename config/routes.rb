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

  namespace :api do
    # 丸の内
    resources :marunouchi, only: :index do
      collection do
        get :consul
        get :only_card
      end
    end
  end

  # 目標管理
  resources :targets

  # 品目
  resources :projects

  # 案件
  resources :quotes do
    post :status
    post :copy
    post :lock
    member do
      get :pdf
      get :bulk_download
    end
  end

  # 案件詳細
  resources :quote_projects, only: [:create, :destroy]

  # 請求
  namespace :invoices do
    post :apipost
    get :roundup
  end

  resources :invoices do
    member do
      get :pdf
    end
  end

  # 活動履歴
  resources :activities

  # 見積書
  resources :quotations do
    member do
      get :pdf
    end
  end

  # 納品書
  resources :delivery_notes do
    member do
      get :pdf
    end
  end

  # 作業
  resources :works do
    member do
      get :directions
    end
  end

  # 作業詳細
  resources :work_details, only: [:create, :destroy]

  # 外注先作業
  resources :work_subcontractors, only: [:create, :update, :show, :destroy] do
    member do
      post :set_client
    end
  end

  # 外注先作業詳細
  resources :work_subcontractor_details, only: [:create, :destroy]

  # 取引先(会社)
  resources :companies do
    collection { post :import_client }
  end

  # 取引先(部署)
  resources :company_divisions

  # 取引先(担当者)
  resources :company_division_clients do
    collection do
      get :search_clients
    end
  end

  # 外注先(会社)
  resources :subcontractors

  # 外注先(部署)
  resources :subcontractor_divisions

  # 外注先(担当者)
  resources :subcontractor_division_clients

  # 外注先支払い情報
  resources :payments

  # 取引先請求情報
  resources :profits

  # 請求情報
  resources :bills

  # 経費入力
  resources :expendables

  # 労務費入力
  resources :labors

  # 自社部署
  resources :divisions

  # カテゴリー
  resources :categories

  # カタログ
  resources :catalogs

  # 名刺
  ## resources :cards, except: :show do
  ##   get :front_preview
  ##   get :reverse_preview
  ##   get :copy
  ##   collection do
  ##     post :transfer
  ##   end
  ## end

  ## # 名刺テンプレート
  ## resources :card_templates do
  ##   collection do
  ##     get :transfer
  ##   end
  ## end

  ## # 名刺情報
  ## resources :card_clients do
  ##   get :front_preview
  ##   get :reverse_preview
  ##   collection do
  ##     get :download
  ##     get :upload
  ##     post :bulk
  ##     post :csv_download
  ##   end
  ## end

  ## 名刺テンプレート
  resources :card_templates

  ## 名刺レイアウト
  resources :card_layouts do
    collection do
      post :transfer
    end
  end

  ## レイアウトフラグ
  resources :content_flags

  ## レイアウト画像・ロゴ
  resources :uploads

  # 在庫管理
  resources :inventories

  # 在庫管理用商品
  resources :products

  # 在庫管理用商品履歴
  resources :product_histories

  # 利益額
  resources :profit_graphs, only: [:index]

  # 品目取り込み
  resources :inquiries, only: :index do
    collection { post :import_bpr }
    collection { post :import_erp }
  end

  # タスク管理
  resources :tasks, only: [:show, :update]

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

  # ユーザー管理
  resources :users, only: [:index, :edit, :update, :destroy]

  mount Sidekiq::Web, at: '/sidekiq'

end
