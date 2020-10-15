##
# Companies Controller
#
class CompanyDivisionsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:divisions) { CompanyDivision.search(params[:search]).all.order(company_id: :desc) }

  expose_with_pagination(:clients) { CompanyDivisionClient.where(company_division_id: division.id).search(params[:name]).all.reverse_order }

  expose(:company) { Company.find(params[:company_id]) }

  expose(:division) { CompanyDivision.find_or_initialize_by id: params[:id] }

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
  #  一覧
  # @version 2018/06/10
  #
  def index

  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '取引先・部署', path: company_path(params[:company_id])
    add_breadcrumb '部署作成'
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    division.update! division_params

    redirect_to company_division_path(division), flash: { notice: { message: '部署情報を作成しました。' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 詳細
  # @version 2018/06/10
  #
  def show

    add_breadcrumb '取引先・部署', path: company_path(division.company_id)
    add_breadcrumb '部署・担当者情報'
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    division.update! division_params

    redirect_to company_division_path(division), flash: { notice: { message: '取引先部署情報を更新しました。' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    raise '対象の部署にはクライアントが情報が登録されているため削除できません' if division.clients.exists?

    division.destroy!

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: '取引先部署情報を削除しました' } }
  rescue => e

    redirect_back fallback_location: url_for({ action: :index }), flash: { notice: { message: e.message } }
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def division_params

      params.require(:company_division).permit :company_id, :name, :kana, :zip, :prefecture_id, :address1, :address2, :note
    end
end
