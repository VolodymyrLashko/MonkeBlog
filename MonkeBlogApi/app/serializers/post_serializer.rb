class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :category_id, :user_id, :pages

  belongs_to :user
  belongs_to :category
  has_many :comments
  has_many :tags
  has_many :likes

  def pages
    @instance_options[:pages]
  end
end
