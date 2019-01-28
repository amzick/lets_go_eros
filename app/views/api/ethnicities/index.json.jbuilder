@ethnicities.each do |ethnicity|
  json.set! ethnicity.id do
    json.partial! "ethnicity", ethnicity: ethnicity
  end
end