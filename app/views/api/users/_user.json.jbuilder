
json.extract! user, :id, :fname, :gender_ids, :ethnicity_ids, :birthday, :astrology_sign, :age, :location, :city, :state, :summary, :height
# json.profile_pictures user.profile_pictures.map {|pic| url_for(pic)}
# json.profile_pictures do
#    user.profile_pictures.each do |pic|
#     
#      json.set! pic.id do 
#       url_for(pic)
#      end
#   end
# end