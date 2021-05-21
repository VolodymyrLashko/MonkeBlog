Rails.application.routes.draw do
  get "/categories", to: "category#index"
  resources :categories
  resources :posts
  resource :users, only: [:create]
  post "/login", to: "users#login"
  get "/auto_login", to: "users#auto_login"
end
