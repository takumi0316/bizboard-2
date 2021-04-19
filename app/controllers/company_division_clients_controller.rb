##
# CompanieDivisionClients Controller
#
class CompanyDivisionClientsController < ApplicationController
  
  #----------------------------------------
  #  ** Includes **
  #----------------------------------------
  
  #----------------------------------------
  #  ** Instance variables **
  #----------------------------------------
  
  expose(:companies) { Company.all.order(:id) }
  
  expose_with_pagination(:clients) { CompanyDivisionClient.search(params[:name]).all.order(:company_division_id) }
  
  expose(:client) { CompanyDivisionClient.find_or_initialize_by id: params[:id] }
  
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
      
      add_breadcrumb '担当者一覧'
    end
  end
  
  ##
  # 新規作成
  # @version 2018/06/10
  #
  def new
    
    add_breadcrumb '担当者一覧', path: company_division_clients_path
    add_breadcrumb '新規作成'
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 新規作成
  # @version 2018/06/10
  #
  def create
  
    client.update! client_params
  
    client.confirmation_token = 'FactoryToken'
    client.confirmed_at = Time.zone.now
    client.confirmation_sent_at = Time.zone.now
    client.save!
  
    redirect_to edit_company_division_client_path(client), flash: { show: true, icon: 'success', message: '担当者情報を作成しました' }
  rescue => e
  
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end

  ##
  # 編集
  # @version 2018/06/10
  #
  def edit
    
    add_breadcrumb '担当者一覧', path: company_division_clients_path
    add_breadcrumb '編集'
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end
  
  ##
  # 更新処理
  # @version 2018/06/10
  #
  def update
    
    client.update! client_params
    
    if client.confirmation_token.nil?
      client.confirmation_token = 'FactoryToken'
      client.confirmed_at = Time.zone.now
      client.confirmation_sent_at = Time.zone.now
      client.save!
    end
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '担当者情報を更新しました' }
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end
 
  ##
  # 削除
  # @version 2018/06/10
  #
  def destroy
    
    raise '対象のクライアントは見積り情報とのひも付きがあるため削除できません' if client.quotes.exists?
    
    client.destroy!
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '担当者情報を削除しました' }
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end
  
  ##
  #
  # @version 2020/04/30
  #
  def search_clients
    
    @clients = CompanyDivisionClient.where company_division_id: params[:company_division_id]
    @cards = Card.where company_id: params[:company_id]
    render json: { status: :success, clients: @clients, cards: @cards }
  end
  
  def update_layout_values
    
    client.update! client_params
    
    layout = params[:layout_type] == 'head' ? client.head_layout : client.tail_layout
    contents = layout.contents.map do |r|
      
      layout_value = LayoutValue.find_or_initialize_by(company_division_client_id: client.id, content_flag_id: r.content_flag_id)
      {
        id: r.id,
        name: r.name,
        x_coordinate: r.x_coordinate,
        y_coordinate: r.y_coordinate,
        font_size: r.font_size,
        layout_length: r.layout_length,
        letter_spacing: r.letter_spacing,
        reduction_rate: r.reduction_rate,
        is_reduction_rated: r.is_reduction_rated,
        font_family: r.font_family,
        font_color: r.font_color,
        font_weight: r.font_weight,
        logo_height: r.logo_height,
        logo_width: r.logo_width,
        flag_id: r.content_flag_id,
        flag_name: r.content_flag.name,
        content_type: r.content_flag.content_type,
        layout_value_id: layout_value.id,
        text_value: layout_value.text_value,
        textarea_value: layout_value.textarea_value,
        no_image: r.no_image,
        upload_id: layout_value.upload_id,
        uploads: r.content_flag.uploads.map do |c|
          {
            id: c.id,
            name: c.name,
            url: url_for(c.image)
          }
        end
      }
    end
    
    render json: { status: :success, contents: contents }
  rescue => e
    
    render json: { status: :error, message: e.message }
  end
  
  def destroy_layout_values
    
    client.layout_values.delete_all
    
    client.update! head_layout_id: nil, tail_layout_id: nil
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'success', message: '登録情報を削除しました' }
  rescue => e
    
    redirect_back fallback_location: url_for({ action: :index }), flash: { show: true, icon: 'info', message: e.message }
  end
  
  #----------------------------------------
  #  ** Methods **
  #----------------------------------------
  
  private
  
  ##
  # パラメータの取得
  # @version 2018/06/10
  #
  def client_params
    
    params.require(:company_division_client).permit :company_division_id, :user_id, :name, :kana, :title, :tel, :email, :password, :password_confirmation, :user_type, :note, :head_layout_id, :tail_layout_id, layout_values_attributes: [
      :id, :company_division_client_id, :text_value, :textarea_value, :layout_type, :content_flag_id, :upload_id, :upload_url, :layout_content_id
    ]
  end
  
  def layout_content_params
    
    params.require(:layout_content).permit :id, :no_image
  end
end