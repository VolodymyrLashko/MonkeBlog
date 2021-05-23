class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    # @posts = Post.where(user_id: @user.id)
    @posts = Post.all().sort { |a, b| b.created_at <=> a.created_at }

    render json: @posts
  end

  def findPosts
    tags = params[:tags]
    category = params[:category]

    # render json: { category: category, tags: tags }
    # return

    if tags != nil && category != ""
      tmp = PostTag.where(tag_id: tags).pluck(:post_id)

      @posts = Post.where(id: tmp, category_id: category)

      render json: @posts
      return
    elsif tags != nil
      tmp = PostTag.where(tag_id: tags).pluck(:post_id)

      @posts = Post.where(id: tmp)

      render json: @posts
      return
    elsif category != ""
      @posts = Post.where(category_id: category)

      render json: @posts
      return
    end
    @posts = Post.all().sort { |a, b| b.created_at <=> a.created_at }
    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    # post_params.tags.each do |tag|
    #   PostTag.new(tag_id: tag, post_id: @post.id)
    # end

    @post = Post.new(post_params)
    @post.user_id = @user.id

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :text, :user_id, :category_id)
  end
end
