class Api::EthnicitiesController < ApplicationController
  def index
    @ethnicities = Ethnicity.all
  end
end