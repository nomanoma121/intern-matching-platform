class Api::MessagesController < ApplicationController
  before_action :authenticate 

  def create
    @message = Message.new(message_params)
    @message.sender_id = @current_user.id
    
    receiver_user = User.find_by(display_id: message_params[:receiver_id])

    if receiver_user.nil?
      render json: { error: "Receiver not found" }, status: :not_found
      return
    end

    @message.receiver_id = receiver_user.id

    if @message.save
      render json: { message: @message }, status: :created
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    partner_id = params[:display_id]
    if current_user.display_id == partner_id
      render json: { error: "Cannot view own messages" }, status: :forbidden
      return
    end

    receiver_user = User.find_by(display_id: partner_id)
    if receiver_user.nil?
      render json: { error: "Receiver not found" }, status: :not_found
      return
    end

    partner_id = receiver_user.id

    @messages = Message.where(
      "(sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)",
      @current_user.id, partner_id,
      partner_id, @current_user.id
    ).order(created_at: :asc)
    if @messages.empty?
      render json: { error: "No messages found" }, status: :not_found
      return
    end

    messages_data = @messages.map do |message|
      {
        id: message.id,
        content: message.content,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        created_at: message.created_at,
        updated_at: message.updated_at
      }
    end
    render json: messages_data
  end

  private
  def message_params
    params.require(:messages).permit(:content, :receiver_id)
  end

end
