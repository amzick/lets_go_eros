class Api::QuestionsController < ApplicationController
  before_action :ensure_logged_in

  def show
    @question = Question.find(params[:id])
    render :show
  end

end