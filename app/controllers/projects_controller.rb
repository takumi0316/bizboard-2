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

  # 案件一覧
  expose_with_pagination(:projects) {
    Project
      .search(params[:name])
      .all
      .reverse_order
  }

  # 案件
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

    add_breadcrumb '案件一覧'
  end

  ##
  # 詳細
  # @version 2018/06/10
  #
  def show

    render :show, layout: false if request.xhr?
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new

    add_breadcrumb '案件一覧', path: projects_path
    add_breadcrumb '案件作成'
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit

    add_breadcrumb '案件一覧', path: projects_path
    add_breadcrumb '案件編集'
  rescue => e
    redirect_back fallback_location: url_for({action: :index}), flash: {notice: {message: e.message}}
  end

  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update

    # 案件情報更新
    project.update! project_params

    project.histories.create!(note: "#{current_user.name}さんが案件を編集しました。")

    render json: { status: :success, project: project }
  rescue => e

    render json: { status: :error, project: project }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create

    # 案件情報更新
    project.update! project_params.merge(user_id: current_user.id)

    project.histories.create!(note: "#{current_user.name}さんが案件を作成しました。")

    render json: { status: :success, project: project }
  rescue => e
    
    render json: { status: :error, project: project }
  end

  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy

    project.destroy!
  rescue => e

    flash[:warning] = { message: e.message }
  ensure
    redirect_to action: :index
  end

  ##
  # ステータスを更新する
  # @version 2018/06/10
  #
  def status

    binding.pry
    project.update!(status: params[:status].to_sym)

    if project.estimated? && project.work.blank?

      project.build_work.save!
    end

    redirect_to works_path, flash: {notice: {message: '作業管理情報を作成しました'}}
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

      params.require(:project).permit(:price, :user_id, :company_division_client_id, :name, :project_count, :project_category, :project_type, :channel, :deliver_at, :deliver_type, :deliver_type_note, :note, :after_process, :binding_work,
        bind_attributes:  [:project_id, :posting_state, :print_size, :print_size_note],
        card_attributes:  [:project_id, :draft_data, :url, :card_type, :work_type, :work_time, :color, :paper, :surface, :emboss],
        copy_attributes:  [:project_id, :posting_state, :draft_split, :draft_restore, :color, :surface, :open_type, :print_size, :print_size_note],
        print_attributes: [:project_id, :draft_data, :url, :work_process, :work_type, :work_note, :work_time, :print_work, :color, :print_size, :print_size_note, :surface, :open_type],
        scan_attributes:  [:project_id, :posting_state, :draft_split, :draft_restore, :back_cut, :back_cut_note, :color, :resolution, :extension, :size_mix, :adf, :odr, :bookmark, :edit_file_name],
        project_after_process_attributes: [:project_id, :folding, :stapler, :hole, :hole_note, :clip, :bind, :bind_note, :back_text, :back_text_note],
        project_binding_work_attributes: [:project_id, :bind_type, :cross_front, :cross_back, :cross_color, :wrap_front, :wrap_back_text, :stitching_paper, :secret_stitch, :secret_stitch_paper, :radio_stitch, :radio_cut, :radio_cut_note, :double_doors, :gold_letter],
      )
    end
end
