
json.extract! user, :id, :fname, :birthday, :location
json.profile_pictures user.profile_pictures.map {|pic| url_for(pic)}
# json.profile_pictures do
#    user.profile_pictures.each do |pic|
#     debugger
#      json.set! pic.id do 
#       url_for(pic)
#      end
#   end
# end