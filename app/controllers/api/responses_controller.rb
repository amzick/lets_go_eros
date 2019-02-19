class Api::ResponsesController < ApplicationController
  before_action :ensure_logged_in

  def create
    @user = User.find(response_params[:user_id])
    @response = Response.new(response_params)
    if @user == current_user && @response.save
      render :show
    else
      render json: @response.errors.full_messages, status: 400
    end
  end

  def update
    @user = User.find(response_params[:user_id])
    @response = Response.find_by(user:@user, question_id: response_params[:question_id])
    if @user == current_user && @response && @response.update(response_params)
      render :show
    else
      render json: @response.errors.full_messages, status: 400
    end
  end
  
  def response_params
    params.require(:response).permit(:user_id, :question_id, :response)
  end
  
end