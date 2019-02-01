class Api::FirstLastController < ApplicationController

  def show
    render json:{first:User.first.id,last:User.last.id}, status: 200
  end

end