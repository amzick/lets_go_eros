class Api::GendersController < ApplicationController
  def index
    @genders = Gender.all
  end
end