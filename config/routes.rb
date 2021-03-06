Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format:'json'} do

    resources :users, only: [:index, :create, :show, :update] do
      get '/nearby', to: 'users#nearby'
      get '/youandthem/:other_user', to: 'users#you_and_them'

      resources :profile_pictures, only: [:create, :destroy]
      resources :messages, only: [:create, :index]
      get '/messages_with/:other_user', to: 'messages#between'
      resources :hearts, only: [:create, :index]
      delete '/hearts', to: 'hearts#destroy'

      get '/random_unanswered_question', to: 'users#random_unanswered_question'
      get '/random_answered_question', to: 'users#random_answered_question'
    end

    resource :session, only: [:create, :destroy]

    get '/first_last', to: 'first_last#show'
    get '/matches/:id_a/:id_b', to: 'matches#show'
    # this custom route allows me to pass urls / emails with multiple dots
    # as paramters. rails by default only allows one dot
    # so I could verify aaronzick@gmail.com but not aaron.zick@gmail.com
    # now emails can be any insane string you want
    # https://github.com/rails/rails/issues/28901
    get 'validity/:field/:value/', to: 'validity#show', constraints: {value: %r{[^\/]+}}

    resources :genders, only: [:index]
    resources :ethnicities, only: [:index]

    resources :messages, only: [:show, :update]
    get 'messages/limited/:message_ids', to: 'messages#limited'
    resources :hearts, only: [:show]
    
    resources :questions, only: [:show]    
    resources :responses, only: [:create, :update, :destroy]
  end
  
  #  was testing aws picture retrieval
  # resources :users, only: [:show]

end
