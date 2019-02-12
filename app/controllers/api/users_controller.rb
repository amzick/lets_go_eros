class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:show]

  def create
    @user = User.new(user_params)
    
    if @user.save
      login(@user)
      # render json response.. for now show (todo: profile)
      render :show
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

  # ??
  def show
    @user = User.find(params[:id])
    render :show
  end

  def index
    unless params[:ids_array].empty?
      @users = params[:ids_array].map {|user_id| User.find(user_id)}
    else
      @users = User.all
    end
    render :index
  end

 

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      # render json response
      render :show
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :fname, :password, :birthday, :location, :city, :state, {gender_ids: []}, {ethnicity_ids: []})
  end

end