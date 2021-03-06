class Api::MessagesController < ApplicationController
  before_action :ensure_logged_in

  def create
    @user = User.find(params[:user_id])
    @message = Message.new(message_params)
    @message.sender = @user
    
    if @user == current_user && @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 400
    end
  end

  def show
    @message = Message.find(params[:id])
    render :show
  end

  def between
    @user = User.find(params[:user_id])
    @other_user = User.find(params[:other_user])
    render :between
  end

  def limited
    message_ids = params[:message_ids].split(",")
    @messages = message_ids.map {|id| Message.find(id) }
    render :index
  end

  # nested in users
  def index
    @user = User.find(params[:user_id])
    @messages = @user.sent_messages + @user.received_messages
    render :index
  end

  # update is only going to be for changing messages from read to unread
  def update
  end

  private

  def message_params
    params.require(:message).permit(:recipient_id, :message, :unread)
  end
end