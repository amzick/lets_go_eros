# Lets Go Eros!

<a href="https://letsgoeros.herokuapp.com" target="_blank">Lets Go Eros</a> is a replica of OKCupid, a dating website that assigns match percentages between users based on responses to questions, what the user is looking for (short term, long term, or casual relationships), and various other secret factors.

## Features

- Frontend and backend user authentication using BCrypt
- Users can customize their profile by changing profile pictures and editing their summary.
- Users can search other users by words in their summaries, or browse and filter the results by gender, race, height, and distance.
- Users can answer questions that will allow an algorithm to determine their match potential with another user.
- Users can send each other messages and heart each other.

### User Creation

The signup process splits each form into its own page. A user can go back and forth and update data as they like, but can only progress based on real time validation of email (can't already have a user with the same email), password (length at least 6), birthday (must be at least 18), genders and race (limited to 5) and location (must be a valid US zip code). This is accomplished with a UI slice of state that maintains the information between components:
```json
entities: {users: {…}, genders: {…}, ethnicities: {…}}
errors: {session: Array(0), ui: Array(1)}
session: {id: null}
ui:
field: "location"
newUser:
birthday: "1989-09-11"
email: "aaronzick@gmail.com"
ethnicities: (2) [38, 44]
fname: "Aaron"
genders: (2) [90, 94]
location: undefined
password: "hunter12"
__proto__: Object
options:
37: {id: 37, ethnicity: "Asian"}
38: {id: 38, ethnicity: "Black"}
39: {id: 39, ethnicity: "Hispanic / Latin"}
40: {id: 40, ethnicity: "Indian"}
41: {id: 41, ethnicity: "Middle Eastern"}
42: {id: 42, ethnicity: "Native American"}
43: {id: 43, ethnicity: "Pacific Islander"}
44: {id: 44, ethnicity: "White"}
45: {id: 45, ethnicity: "Other"}
```
Errors and messages are displayed in real time.
Location is validated with a Google Maps API request.
<img src="https://s3.amazonaws.com/letsgoeros-dev/lge-location-valid.png"/>
All other inputs are validated along a custom route I wrote that calls a function that checks the validity of a parameter without attempting to persist the user to the database.
```ruby
<i>routes.rb</i>
...
get 'validity/:field/:value/', to: 'validity#show', constraints: {value: %r{[^\/]+}}
...
<i>validity_controller.rb</i>
class Api::ValidityController < ApplicationController

  def show
    field = params[:field]
    case field
    when "email"
      # value = params.fetch(:value)
      value = CGI::unescape(params[:value])
    when "birthday"
      value = Date.parse(params[:value])
      astrology_sign = User.new(birthday:value).astrology_sign
    when "genders", "ethnicities"
      value = params[:value].split(",").map {|el| el.to_i}
    else
      value = params[:value]
    end

    unless field == "genders" || field == "ethnicities"
      @user = User.new(field => value)
    else
      @user = User.new
      @user.gender_ids = value if field == "genders"
      @user.ethnicity_ids = value if field == "ethnicities"
    end

    if @user.valid_attribute?(field)
      unless field == "birthday"
        render json: {field:field,value:value}, status: 200
      else
        render json: {field:field,value:value,sign:astrology_sign}, status:200
      end
    else
      render json: @user.errors[field], status: 400
    end
  end

end
```
<img src="https://s3.amazonaws.com/letsgoeros-dev/lge-email-invalid.png" />

### Matchmaking
Every question is formulated as a statement that the user can either agree or disagree with, weighed from strong disagreement to indifference to strong agreement. Each question falls into a category, and each user has a 'score' for each question category, scaled from 0 to 1. For example: the user is presented with the statement "I am the life of the party!". If the user answered 'strongly agree', that would shift their category scale closer to one. Answering all 'extroversion' questions with a strongly extroverted response (some of the questions can invert the logic; for example strongly <i>disagreeing</i> with "I am quiet around strangers" should increase the extroversion score) shifts the users extroversion score closer to one.
Using categories allows us to compare users that may not have necessarily answered the same questions. Of course, the responses to mutually answered questions are also compared and factored into the matchmaking algorithm.

```ruby
<i>user.rb</i>
def match_percentage(match)
    category_comparison = 100.0
    category_array = self.category_diffs(match)
    category_array.each {|el| category_comparison -= ((100.0/category_array.length)*el)}
    
    
    maq_array = self.maq_diffs(match)
    if maq_array.length.zero?
      maq_comparison = 0.5
    else
      maq_comparison = 100.0 - ( (100.0/maq_array.length) * (1.0/(Category.all.length)) * maq_array.inject(&:+).to_f)
    end
    
    #if more weighted comparisons added (ie love languages) don't forget to update the scales!
    scale = 0.5
    (scale * (category_comparison + maq_comparison)).floor
    
  end
  ```
  <img src="https://s3.amazonaws.com/letsgoeros-dev/profile-view.png" />
