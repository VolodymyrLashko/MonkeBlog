class Post < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :comments
  has_many :post_tags
  has_many :tags, through: :post_tags
  has_many :likes
  self.per_page = 12
end
