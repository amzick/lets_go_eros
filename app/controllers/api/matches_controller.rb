class Api::MatchesController < ApplicationController 

  def show
    @user_a = User.find(params[:id_a])
    @user_b = User.find(params[:id_b])
    render :show
  end
end