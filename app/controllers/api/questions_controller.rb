class Api::QuestionsController < ApplicationController

  def show
    @question = Question.find(params[:id])
    render :show
  end

end