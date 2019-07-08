# TO DO LIST

Create sdg full stack template and start working on back end for roll call app (Capstone)

- watch mark video of how to set up web app
- import existing css and HTML for styling and site layout
- create student, teacher, attendance, and class models
- create some endpoints to do some API calls
- update styling a bit

## Notes:

For the back end I need to figure out how to structure my two pages.
The TeacherPortal page will have the teachers being able to login as the (USER) with the handrolled authentication and they are able to manage check in's for the students in their class.

The StudentPortal will have students able to see their attendance history over a period of time for each class they are in.

### Front end

Can style the css page so the student check in containers look like desks and the teachers can set the location of each student

## to Deploy to heroku:

- [ ] create a web app on heroku, make sure to have the CLI downloaded, installed, logged in and be logged into the container via heroku.
- [ ] Update your `dockerfile` to use your `*.dll` file instead of `dotnet-sdg-template.dll`
- [ ] Update the deploy script:
  - [ ] change `sdg-template-image` to `your-project-name-image`
  - [ ] change `heroku-web-app` to your web app name on heroku
