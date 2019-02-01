# Lets Go Eros!

<a href="https://letsgoeros.herokuapp.com" target="_blank">Lets Go Eros</a> is a replica of OKCupid, a dating website that assigns match percentages between users based on responses to questions, what the user is 'looking for' (short term, long term, or casual relationships), and various other secret factors.

## Features

- Frontend and backend user authentication using BCrypt
- Users can search other users by words in their summaries, or browse and filter the results by gender, race, height, and distance.
- Users can answer questions that will allow an algorithm to determin their 'match potential' with another user.
- Users can send each other messages and 'heart' each other.

### User Creation

The signup process splits each form into its own page. A user can go back and forth and update data as they like, but can only progress based on real time validation of email (can't already have a user with the same email), password (length at least 6), birthday (must be at least 18), genders and race (limited to 5) and location (must be a valid US zip code). This is accomplished with a UI slice of state that maintains the information between components:
```
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
<img src="https://s3.amazonaws.com/letsgoeros-dev/lge-location-valid.png"/>
<img src="https://s3.amazonaws.com/letsgoeros-dev/lge-email-invalid.png" />

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
