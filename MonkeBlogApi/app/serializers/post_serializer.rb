class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :category_id, :user_id

  belongs_to :user
  belongs_to :category
  has_many :comments
  has_many :tags
  has_many :likes
end
