"Surprise, Surprise!" Event Calendar README.md

brought to you by Riad, Max, and Miles: github usernames - milescogan92, max-spec007, riadjm

Github repos:
- API: https://github.com/Boot2boot/boot2boot-api
- React: https://github.com/Boot2boot/boot2boot-react-client

Deployed sites:
- front end: https://boot2boot.github.io/boot2boot-react-client/#/
- back end: https://gentle-eyrie-69733.herokuapp.com/

ERD: ![](https://imgur.com/3AU0wdE)
Wireframe: ![](https://imgur.com/bvJcSJu)

This application is the front-end portion of an Event site.  Users can create events, and other users can RSVP to said events in order to attend them.  More specifically, a user can create an event, update their own event, and other users can RSVP (but not create or edit) other user events.  Think of this like a calendar/event app that could be used for a wedding or other social events.

One of the biggest issues we ran into coding on the react front end was the destroy function for the RSVP. Although these issues were mostly on the back end, even rendering our destroy and create RSVP functions were difficult in and of themselves.  The syntax dealing with the back end, and making sure parameters were properly passed, was quite a challenge.  Line 50 of the EventShow.js file is a good example of confusing syntax associated with this project, where we define what we are passing into the if statement.

Perhaps on future front end versions, we could create something that would display the index on the home page with each event in an individual box rather than a link that would be viewable.  We could also add some sort of location funtionality that would use Google maps to point to exactly where an event is taking place.

User stories:
As an unregistered user, I would like to sign up with email and password.
As a registered user, I would like to sign in with email and password.
As a signed in user, I would like to change password.
As a signed in user, I would like to sign out.
As an unregistered user, I would like to see all events.
As a signed in user, I would like to RSVP to an event.
As a signed in user, I would like to create my own event.
As a signed in user, I would like to update my own events.
As a signed in user, I would like to delete my own events.

Great project to work on as a team, although challenging!
