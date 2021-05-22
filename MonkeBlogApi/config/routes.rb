Rails.application.routes.draw do
  resources :post_likes
  resources :likes
  resources :comments
  resources :post_tags
  resources :tags
  get "/categories", to: "category#index"
  resources :categories
  resources :posts
  resource :users, only: [:create]
  post "/login", to: "users#login"
  get "/auto_login", to: "users#auto_login"
end
