Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format:'json'} do
    resources :users, only: [:create, :show, :update] do
    end
    resource :session, only: [:create, :destroy]
    # this custom route allows me to pass urls / emails with multiple dots
    # as paramters. rails by default only allows one dot
    # so I could verify aaronzick@gmail.com but not aaron.zick@gmail.com
    # now emails can be any insane string you want
    # https://github.com/rails/rails/issues/28901
    get 'validity/:field/:value/', to: 'validity#show', constraints: {value: %r{[^\/]+}}

  end
  
  #  was testing aws picture retrieval
  # resources :users, only: [:show]

end
