Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html


  get '/maps', to: 'pages#maps', as: :maps
  get 'getMapData', to: 'pages#getMapData'

  resources :reports do
    resources :reviews, only: [:new, :create]
    patch 'close', to: 'reports#close'
  end
  resources :reviews, only: [:show, :destroy]

end
