class Api::ProfilePicturesController < ApplicationController

  before_action :ensure_logged_in

  def create
    
    @photo = photo_params[:photo]
    
    if current_user.id == photo_params[:id].to_i && @photo
      current_user.profile_pictures.attach(io: @photo, filename:"#{current_user.id}_profile_picture_#{current_user.profile_pictures.length}.jpg")
      render json: @photo
    else
    
      render json: {current_user: current_user.id, photo: @photo, params_id: photo_params[:id]}, status: 400
    end
  end

  private

  def photo_params
    params.require(:user).permit(:id, :photo)
  end


end