class Api::ValidityController < ApplicationController

  def show
    field = params[:field]
    case field
    when "email"
      # value = params.fetch(:value)
      value = CGI::unescape(params[:value])
    when "birthday"
      value = Date.parse(params[:value])
      astrology_sign = User.new(birthday:value).astrology_sign
    when "genders", "ethnicities"
      value = params[:value].split(",").map {|el| el.to_i}
    else
      value = params[:value]
    end

    unless field == "genders" || field == "ethnicities"
      @user = User.new(field => value)
    else
      @user = User.new
      @user.gender_ids = value if field == "genders"
      @user.ethnicity_ids = value if field == "ethnicities"
    end

    if @user.valid_attribute?(field)
      unless field == "birthday"
        render json: {field:field,value:value}, status: 200
      else
        render json: {field:field,value:value,sign:astrology_sign}, status:200
      end
    else
      render json: @user.errors[field], status: 400
    end
  end

end