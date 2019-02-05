class Api::MessagesController < ApplicationController
  before_action :ensure_logged_in

  def create
    @message = Message.new(message_params)
    if @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 400
    end
  end

  def show
    @message = Message.find(params[:id])
    render :show
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
    params.require(:message).permit(:sender_id, :recipient_id, :message, :unread)
  end
end