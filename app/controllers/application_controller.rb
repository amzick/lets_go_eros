class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  #celll
  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def ensure_logged_in
    #todo redirect to log in page instead?
    redirect_to root_url unless logged_in?
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

end
