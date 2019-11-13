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

      params.require(:project).permit(:price, :user_id, :company_division_client_id, :name, :project_category, :note, :after_process, :binding_work, :code,
        bind_attributes:  [:project_id, :posting_state, :print_size, :print_size_note, :price],
        card_attributes:  [:project_id, :draft_data, :url, :card_type, :work_type, :work_time, :work_price, :color, :paper, :surface, :emboss, :price],
        copy_attributes:  [:project_id, :posting_state, :posting_state_note, :draft_split, :draft_restore, :color, :surface, :open_type, :print_size, :print_size_note, :price],
        print_attributes: [:project_id, :draft_data, :url, :work_process, :work_type, :work_note, :work_time, :work_price, :print_work, :color, :print_size, :print_size_note, :surface, :open_type, :price],
        scan_attributes:  [:project_id, :posting_state, :posting_state_note, :draft_split, :draft_restore, :back_cut, :back_cut_note, :color, :resolution, :extension, :size_mix, :adf, :odr, :bookmark, :edit_file_name, :price],
        project_after_process_attributes: [:project_id, :folding, :stapler, :hole, :hole_note, :clip, :bind, :bind_note, :back_text, :back_text_note, :note, :folding_price, :stapler_price, :hole_price, :clip_price, :bind_price, :back_text_price],
        project_binding_work_attributes: [:project_id, :bind_type, :cross_front, :cross_back, :cross_color, :wrap_front, :wrap_back_text, :stitching_paper, :secret_stitch, :secret_stitch_paper, :radio_stitch, :radio_cut, :radio_cut_note, :double_doors, :gold_letter, :note, :price],
      )
    end
end
