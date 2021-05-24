class Post < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :comments, :dependent => :destroy
  has_many :post_tags, :dependent => :destroy
  has_many :tags, through: :post_tags
  has_many :likes
  self.per_page = 12
end
