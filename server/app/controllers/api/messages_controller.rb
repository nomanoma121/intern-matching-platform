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
    partner_display_id = params[:id]
    if current_user.display_id == partner_display_id
      render json: { error: "Cannot view own messages" }, status: :forbidden
      return
    end

    partner_user = User.find_by(display_id: partner_display_id)
    if partner_user.nil?
      render json: { error: "Receiver not found" }, status: :not_found
      return
    end

    partner_id = partner_user.id

    @messages = Message.where(
      "(sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)",
      @current_user.id, partner_id,
      partner_id, @current_user.id
    ).order(created_at: :asc)

    if @messages.empty?
      render json: [], status: :ok
      return
    end

    # display_idマッピング用のキャッシュ
    user_id_to_display_id = {
      @current_user.id => @current_user.display_id,
      partner_id => partner_user.display_id
    }

    messages_data = @messages.map do |message|
      {
        id: message.id,
        content: message.content,
        sender_id: user_id_to_display_id[message.sender_id],
        receiver_id: user_id_to_display_id[message.receiver_id],
        created_at: message.created_at,
        updated_at: message.updated_at
      }
    end

    render json: messages_data
  end

  def index
    raw_messages = Message
      .where("sender_id = ? OR receiver_id = ?", @current_user.id, @current_user.id)
      .order(created_at: :desc)

    latest_messages_map = {}

    raw_messages.each do |message|
      ids = [message.sender_id, message.receiver_id].sort
      thread_key = "#{ids[0]}_#{ids[1]}"
      latest_messages_map[thread_key] ||= message
    end

    latest_messages = latest_messages_map.values

    user_ids = latest_messages.map do |msg|
      msg.sender_id == @current_user.id ? msg.receiver_id : msg.sender_id
    end.uniq

    users = User.where(id: user_ids).index_by(&:id)

    messages_data = latest_messages.map do |msg|
      is_sender = msg.sender_id == @current_user.id
      partner_user_id = is_sender ? msg.receiver_id : msg.sender_id
      user = users[partner_user_id]

      profile =
        if user.role == "COMPANY"
          CompanyProfile.find_by(user_id: partner_user_id)
        else
          InternProfile.find_by(user_id: partner_user_id)
        end

      {
        id: msg.id,
        latest_content: msg.content,
        created_at: msg.created_at,
        updated_at: msg.updated_at,
        partner: {
          id: user.id,
          display_id: user.display_id,
          name: user.role == "COMPANY" ? profile&.company_name : profile&.name
        }
      }
    end

    render json: messages_data
  end

  private
  def message_params
    params.require(:message).permit(:content, :receiver_id)
  end

end
