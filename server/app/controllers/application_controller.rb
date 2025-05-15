class ApplicationController < ActionController::API
  def create_token(user_id)
    payload = {user_id: user_id}
    secret_key = Rails.application.credentials.secret_key_base
    token = JWT.encode(payload, secret_key)
    return token
  end

def authenticate
  authorization_header = request.headers[:authorization]
  Rails.logger.debug("🔐 Authorization header: #{authorization_header.inspect}")

  unless authorization_header
    Rails.logger.warn("🚫 Missing Authorization header")
    return render_unauthorized
  end

  token = authorization_header.split(" ")[1]
  Rails.logger.debug("🪙 Extracted JWT token: #{token}")

  secret_key = Rails.application.credentials.secret_key_base

  begin
    decoded_token = JWT.decode(token, secret_key, true, { algorithm: 'HS256' })
    Rails.logger.debug("✅ Decoded token: #{decoded_token}")
    @current_user = User.find(decoded_token[0]["user_id"])
  rescue ActiveRecord::RecordNotFound => e
    Rails.logger.warn("❌ User not found: #{e.message}")
    render_unauthorized
  rescue JWT::DecodeError => e
    Rails.logger.warn("❌ JWT decode error: #{e.message}")
    render_unauthorized
  end
end

  def current_user
    @current_user
  end

  def render_unauthorized
    render json: { errors: 'Unauthorized' }, status: :unauthorized
  end
end
