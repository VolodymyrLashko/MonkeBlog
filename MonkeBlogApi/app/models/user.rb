class User < ApplicationRecord
  has_secure_password
  has_many :post
  belongs_to :like
end
