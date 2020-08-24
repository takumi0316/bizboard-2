class CardLayoutsController < ApplicationController

  #----------------------------------------
  #  ** Includes **
  #----------------------------------------

  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------

  expose_with_pagination(:card_layouts) { CardLayout.with_attached_file.search(params[:name]).all.reverse_order }

  expose(:card_layout) { CardLayout.with_attached_file.find_or_initialize_by(id: params[:id]) }

  #----------------------------------------
  #  ** Layouts **
  #----------------------------------------

  #----------------------------------------
  #  ** Request cycles **
  #----------------------------------------

  #----------------------------------------
  #  ** Actions **
  #----------------------------------------

  before_action :set_the_required_data, only: [:new, :edit]

  def index

    add_breadcrumb '一覧'
  end

  def new

    add_breadcrumb '一覧', path: card_layouts_path
    add_breadcrumb '新規作成'
  end

  def create

    card_layout.update! card_layout_params

    render json: { status: :success, card_layout_id: card_layout.id }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  def edit

    add_breadcrumb '一覧', path: card_layouts_path
    add_breadcrumb '編集'
  end

  def update

    card_layout.update! card_layout_params

    render json: { status: :success }
  rescue => e

    render json: { status: :error, message: e.message }
  end

  def destroy

    card_layout.destroy!

    redirect_to card_layouts_path, flash: { notice: { message: 'レイアウトを削除しました。' } }
  rescue => e

    redirect_to card_layouts_path, flash: { notice: { message: e.message } }
  end

  def upload

    send_data File.read(fullpath), filename: filename, type: 'application/zip'
  end

  ##
  # 画像引用参照
  # @version 2018/06/10
  #
  def transfer

    raise if params[:url].blank?
    content = open params[:url]
    send_data content.read, type: content.content_type, disposition: 'inline'
  rescue

    render_json_404
  end

  #----------------------------------------
  #  ** Methods **
  #----------------------------------------

  private

    def card_layout_params

      params.require(:card_layout).permit :name, :file, contents_attributes: [
        :id, :content_upload_id, :content_flag_id, :name, :x_coordinate, :y_coordinate, :font_family, :font_color, :font_size, :layout_length, :letter_spacing, :reduction_rate, :is_reduction_rated, :layout_type, :logo_height, :logo_width, :_destroy,
        content_uploads_attributes: [
          :id, :layout_content_id, :upload_id, :_destroy
        ]
      ]
    end

    def set_the_required_data

      @layout_contents = []
      @pdf = ''
      @action = card_layouts_path
      @new_record = card_layout.new_record?

      if card_layout.persisted?

        @layout_contents = card_layout.contents.map do |r|
          {
            id: r.id,
            name: r.name,
            x_coordinate: r.x_coordinate,
            y_coordinate: r.y_coordinate,
            font_family: r.font_family,
            font_size: r.font_size,
            font_color: r.font_color_before_type_cast,
            layout_length: r.layout_length,
            letter_spacing: r.letter_spacing,
            reduction_rate: r.reduction_rate,
            is_reduction_rated: r.is_reduction_rated_before_type_cast,
            layout_type: r.layout_type_before_type_cast,
            content_flag_name: r.content_flag.name,
            content_flag_id: r.content_flag.id,
            logo_height: r.logo_height,
            logo_width: r.logo_width,
            uploads: r.content_uploads.map do |c|
              {
                id: c.id,
                upload_id: c.upload_id,
                name: c.upload.name,
                url: c.upload.image.service_url
              }
            end
          }
        end

        @pdf = card_layout.file.service_url
        @action = card_layout_path
        @new_record = false

      end

    end

end
