##
# Projects Controller
#
class ProjectsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  # 品目一覧
  expose_with_pagination(:projects) {
    Project
      .search(params[:free_word])
      .all
      .reverse_order
  }

  # 品目
  expose(:project) { Project.find_or_initialize_by id: params[:id] || params[:project_id] }

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

    add_breadcrumb '品目一覧'
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '品目一覧', path: projects_path
    add_breadcrumb '品目作成'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '品目一覧', path: projects_path
    add_breadcrumb '品目編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 品目情報更新
    project.update! project_params

    project.histories.create!(note: "#{current_user.name}さんが品目を編集しました。")

    render json: { status: :success, project: project }
  rescue => e

    render json: { status: :error, project: project }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 品目情報更新
    project.update! project_params

    project.histories.create!(note: "#{current_user.name}さんが品目を作成しました。")

    render json: { status: :success, project: project }
  rescue => e

    render json: { status: :error, project: project }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    raise '対象の案件を用いた見積書が作成済みのため削除することはできません' if project.quotes.exists?

    project.destroy!
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    ##
    # パラメータの取得
    # @version 2018/06/10
    #
    def project_params

      params.require(:project).permit(:price, :name, :note, :code)
    end
end
