
json.extract! user, :id, :fname, :gender_ids, :ethnicity_ids, :birthday, :astrology_sign, :age, :location, :city, :state, :summary, :height, :bot_img_src
json.profile_pictures user.profile_pictures.map {|pic| polymorphic_url(pic)}
json.match current_user.match_percentage(user)

# 
# json.profile_pictures do
#    user.profile_pictures.each do |pic|
    
#      json.set! pic.id do 
#       url_for(pic)
#      end
#   end
# end