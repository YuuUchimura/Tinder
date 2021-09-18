Rails.application.routes.draw do
  devise_for :users,
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  controllers: { registrations: "registrations", sessions: :sessions }

  root "top#index"
  resources :users, only: [:show, :index]
  resources :reactions, only: [:create]
  resources :matching, only: [:index]
  resources :chat_rooms, only: [:create, :show]
end
