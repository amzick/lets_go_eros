class Api::HeartsController < ApplicationController
  before_action :ensure_logged_in

  def show
    @heart = Heart.find(params[:id])
    render :show
  end
  def create
    @crush = User.find(params[:user_id])
    @admirer = current_user
    @heart = Heart.new(crush:@crush,admirer:@admirer)
    if @admirer == current_user && @heart.save
      render :show
    else
      render json: @heart.errors.full_messages, status: 400
    end
  end

  def destroy
    @crush = User.find(params[:user_id])
    @admirer = current_user
    @heart = Heart.find_by(crush:@crush,admirer:@admirer)
    @heart.destroy
  end

end