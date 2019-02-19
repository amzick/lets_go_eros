class Api::UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:show]

  def create
    @user = User.new(user_params)
    
    if @user.save
      Heart.create!({admirer: User.first, crush: @user})
      Heart.create!({admirer: User.second, crush: @user})
      Heart.create!({admirer: @user, crush:User.first})
      Heart.create!({admirer: @user, crush:User.second})
      Message.create!({
        recipient: @user,
        sender: User.third,
        message: "Welcome to my app #{@user.fname}! Click on your profile to add a summary and (space-separated) interests, which will be used to find 
        other users. Click on your profile picture to upload a new picture."
      })
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
    
    if params[:ids_array].nil?
      # for some reason passing in an empty array turns into nil.. and I get a lot of errors if @users is nothing
      # @users = [current_user]
      # render :index
      render json: [], status: 200
    elsif !params[:ids_array].empty?
      @users = params[:ids_array].map {|user_id| User.find(user_id)}
      render :index
    else
      # sending no argument still works here since for some reason the default value of idsArray (null) is an empty string, which is not nil
      # makes perfect sense....
      @users = User.all
      render :index
    end
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

  def nearby
    
    @user = User.find(params[:user_id])

    
    if @user
      
      render json: @user.nearby_user_ids(params[:max_result_size].to_i,params[:radius].to_i)
    else
      render json: ["User not found"], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :fname, :password, :birthday, :location, :city, :state, :lat, :lng, {gender_ids: []}, {ethnicity_ids: []}, :summary, :interests)
  end

end