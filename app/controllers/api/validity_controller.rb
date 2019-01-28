class Api::ValidityController < ApplicationController

  def show
    field = params[:field]
    case field
    when "email"
      # value = params.fetch(:value)
      value = CGI::unescape(params[:value])
    when "birthday"
      value = Date.parse(params[:value])
    when "genders"
      value = params[:value].split(",").map {|el| el.to_i}
    else
      value = params[:value]
    end

    unless field == "genders" 
      @user = User.new(field => value)
    else
      @user = User.new
      @user.gender_ids = value
    end

    if @user.valid_attribute?(field)
      render json: {field:field,value:value}, status: 200
    else
      render json: @user.errors[field], status: 400
    end
  end

end