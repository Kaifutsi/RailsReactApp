class NewsController < ApplicationController
  before_action :set_news, only: [:show, :update, :destroy]

  def index
    @news = if params[:start_date] && params[:end_date]
              date_range_filter
            else
              News.where(published: true, hidden: false)
            end
    render json: @news
  end

  def show
    render json: @news
  end

  def create
    @news = News.new(news_params)
    if @news.save
      render json: @news, status: :created, location: @news
    else
      render json: @news.errors, status: :unprocessable_entity
    end
  end

  def update
    if @news.update(news_params)
      render json: @news
    else
      render json: @news.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @news.destroy
  end

  private
    def set_news
      @news = News.find(params[:id])
    end

    def news_params
      params.require(:news).permit(:title, :content, :published, :publish_date, :image)
    end

    def date_range_filter
      start_date = Date.parse(params[:start_date])
      end_date = Date.parse(params[:end_date])
      News.where("publish_date >= ? AND publish_date <= ?", start_date, end_date)
    end
end
