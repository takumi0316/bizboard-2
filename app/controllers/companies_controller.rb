##
# Companies Controller
#
class CompaniesController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 取引先一覧
  expose_with_pagination(:companies) { Company.search(params[:name]).all.reverse_order }

  # 取引先
  expose(:company) { Company.find_or_initialize_by id: params[:id] || params[:company_id] }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  ##
  # 一覧
  # @version 2018/06/10
  #
  def index

    unless request.xhr?

      add_breadcrumb '取引先一覧'
    end
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '新規作成'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '取引先一覧', path: companies_path
    add_breadcrumb '編集'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 取引先情報更新
    company.update! company_params

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: '取引先情報を更新しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 取引先情報更新
    company.update! company_params

    redirect_to edit_company_path(company), flash: { notice: { message: '取引先情報を更新しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    raise '対象の会社には部署情報が登録されているため削除できません' if company.divisions.exists?

    company.destroy!
  rescue => e

    flash[:warning] = { message: e.message }
  ensure

    redirect_to action: :index
  end

  def import_client

    # fileはtmpに自動で一時保存される
    Company.import_client(params[:file], params[:company_id])
    redirect_to companies_path, flash: { notice: { message: '' } }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def company_params

      params.require(:company).permit :name, :kana, :note, :approval_status
    end
end
