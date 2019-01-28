@genders.each do |gender|
  json.set! gender.id do
    json.partial! "gender", gender: gender
  end
end