class Api::MarunouchiController < ApplicationController

  expose(:all) {
    Invoice.joins(:quote).where('quotes.division_id': 5).where(date: (params[:sdate].present?? params[:sdate] : Time.current.beginning_of_month)..(params[:edate].present?? params[:edate] : Time.current.beginning_of_month)).order(date: :asc)
  }

  expose(:only_card) {
    Invoice.joins(:quote).where('quotes.division_id': 5).where('quotes.subject like ?', '%名刺%').where(date: (params[:sdate].present?? params[:sdate] : Time.current.beginning_of_month)..(params[:edate].present?? params[:edate] : Time.current.beginning_of_month)).order(date: :asc)
  }

  expose(:consul) {
    Invoice.joins(:quote).where('quotes.division_id': 10).where(date: (params[:sdate].present?? params[:sdate] : Time.current.beginning_of_month)..(params[:edate].present?? params[:edate] : Time.current.beginning_of_month)).order(date: :asc)
  }

  def index

    respond_to do |format|
      format.html do
        # 置いておかないとエラーになる
      end
      format.csv do
        @all = all
        send_data render_to_string, filename: "丸の内全案件_#{params[:sdate].to_datetime.month}月.csv", type: :csv
      end
    end

  rescue => e

    flash[:warning] = { message: e.message }
  end

  def only_card

    respond_to do |format|
      format.html do
        # 置いておかないとエラーになる
      end
      format.csv do
        @only_card = only_card
        send_data render_to_string, filename: "丸の内案件(名刺のみ)_#{params[:sdate].to_datetime.month}月.csv", type: :csv
      end
    end

  rescue => e

    flash[:warning] = { message: e.message }
  end

  def consul

    respond_to do |format|
      format.html do
        # 置いておかないとエラーになる
      end
      format.csv do
        @consul = consul
        send_data render_to_string, filename: "コンサル2Gr全案件_#{params[:sdate].to_datetime.month}月.csv", type: :csv
      end
    end

	rescue => e

    flash[:warning] = { message: e.message }
  end
end
