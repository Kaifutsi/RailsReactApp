class Admin::NewsController < ApplicationController
  before_action :set_news, only: [:show, :edit, :update, :destroy]

  def index
    @news = News.all
    render json: @news
  end

  def show
    render json: @news
  end

  def new
    @news = News.new
  end

  def create
    @news = News.new(news_params)
    if @news.save
      render json: @news, status: :created
    else
      render json: @news.errors, status: :unprocessable_entity
    end
  end

  def edit
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
    head :no_content
  end

  private

  def set_news
    @news = News.find(params[:id])
  end

  def news_params
    params.require(:news).permit(:title, :content, :published, :publish_date, :image)
  end
end
