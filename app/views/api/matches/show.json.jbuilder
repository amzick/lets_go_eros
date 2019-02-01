json.match_percentage @user_a.match_percentage(@user_b)
[@user_a, @user_b].each do |user|
  json.set! user.id do
    json.extract! user, :responses
  end
end