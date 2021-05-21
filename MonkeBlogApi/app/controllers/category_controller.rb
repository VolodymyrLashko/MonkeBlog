class CategoryController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]
  before_action :authorized

  def index
    @categories = Category.all()

    render json: @categories
  end

  def show
  end

  def update
  end

  def create
    @category = Category.new(category_params)
  end

  def destroy
  end

  private

  def set_category
    @post = Post.find(id: params[:id])
  end

  def category_params
    params.require(:category).permit(:name)
  end
end
