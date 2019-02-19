
json.extract! user, :id, :fname, :gender_ids, :ethnicity_ids, :birthday, :astrology_sign, :age, :location, :city, :state, :lat, :lng, :summary, :interests, :height, :bot_img_src, :is_messaging_with
json.profile_pictures user.profile_pictures.map {|pic| polymorphic_url(pic)}
json.match current_user.match_percentage(user)
json.is_crush current_user.crushes.include?(user)
json.is_admirer current_user.admirers.include?(user)

responses_hash = Hash.new
user.responses.each do |response|
  responses_hash[response.question_id] = response.response
end
json.responses responses_hash


# 
# json.profile_pictures do
#    user.profile_pictures.each do |pic|
    
#      json.set! pic.id do 
#       url_for(pic)
#      end
#   end
# end