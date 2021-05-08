class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :text, :category_id, :user_id

  belongs_to :category
  belongs_to :user
  has_many :comments
end
