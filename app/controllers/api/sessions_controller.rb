class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
      )
      
      if @user
      # testing
      # p "logged in"
      login(@user)
      render 'api/users/show'
      # redirect_to "/#/users/#{@user.id}"
      # redirect_to "/#/logout"
    else
      # todo: make errors more specific to if wrong username or password
      render json: ["Wrong username or password"], status: 400
    end
  end

  def destroy
    if current_user
      #testing
      # p "logged out"
      logout!
      # todo render empty object...?
      render json: {}
      # redirect_to root_url
    else
      render json: ['No current user'], status: 400
    end
  end

end