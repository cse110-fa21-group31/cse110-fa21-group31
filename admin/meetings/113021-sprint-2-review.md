
**Sprint Review Meeting 2**

Attendance: Tallis, Euvin, Celia, Xin, Danica, Kian, Sarah, Serina, Eric

Absence: Bjorn

Date: 11/ 30

**Frontend:**

**Danica:** 


* Worked on connecting frontend and backend - debug api calls and make api calls, send and receive recipe forms, connected to recipeDetail, editCreate. 
* Worked on HTML/CSS/JS for editCreate and recipeDetail pages. 
* Made sprint video.

**Euvin:**

* Helped with the delete functionality (thank you Celia).
* Did the entire pipeline with Kian with github actions, integrating sonarcloud, linters/formatters/doc generators, made and submitted CI stuff to group repo

**Serina:**

* Worked with Tallis for the Google sign in as nav bar, and having it displayed on the correct pages. 
* Created Javascript file to parse thru JSON. 
* Helped implement footer/header in every page. 
* Created JavaScript/HTML for tags with Tallis. Developed CSS for multiple pages.
* Held frontend standup meetings 2x a week. 
* Helped translate HTML, CSS code for homepage/landing page to the Single Page Web App.
* Reviewed (and fixed for any merge conflicts) pull requests from the frontend team, and also rolled back self-made “bad commits”.

**Tallis:**

* Updated and debugged the google sign in connected to the nav bar. 
* Added a tags framework with some basic css. 

**Backend:**

**Bjorn:**

* Implemented api call handling on both front and back end to allow searching via keywords, tags, and/or ids Partially implemented pagination in search results to display the proper subset of all results on a given page 
* Connected search button to front end code to execute searches and display the results on the home page

**Celia:**

* Break down the features into small tasks and create issues, put the tasks on project board, and assign appropriate tasks. 
* Held weekly standup meetings to check the backend team’s progress. Communicate with frontend and work to set up needed features that will be used in backend development (eg, tags selection on the home page). Track both backend and frontend members progress on CRUD and help test their code before merging the pull request.
* Migrate our app from multiple pages web app to a Single Page Web App, including rewrote html elements and javascripts logic with Xin.
* Set up routing with Xin and dynamically populate the home page, recipe Detail page, and user info page. 
* Set up server with fastify (and cors before we finish using the server to host the app), define necessary API calls between frontend and server (with Xin), and help debugging issues related to the API calls implementation both on the frontend side and the backend side.
* Integrate and help debug the CRUD feature into our apps with backend and frontend team members.
* Integrate the comments components to the recipe Detail page with Kian.
* Integrate and help improve the search functions on the home page with Bjorn.
* Tested deploy our app on glitch.

**Kian:**

* Implemented backend API regarding recipe operations by interacting with the recipe database.
* Planned out and implemented the pipeline with Euvin, focusing largely on linting and formatting.
* Began writing unit tests that are run as part of the pipeline.
* Assisted Celia with integrating comments components for the recipe details pages.

**Xin:**

* Implemented backend API regarding user operations. 
* Worked with Celia on migrating from multiple-page-app to single-page-app, and worked on setting up the routing. Integrated all of CRUD features into the webapp. 
* Updated Eric’s progress on serving html files through Fastify and integrated the whole project (frontend html/js + backend APIs) onto the Fastify server. 
* Implemented image upload feature. 

**TeamLead:**

**Eric:**

* Determined which web framework would be in use, where we would host, that we could host in the way we do, established working local hosting and routing with fastify(before we switched from strict fastify SPA to a 110 lab-fastify hybrid in which fastify hosts home, else lab SPA, because Xin and Celia liked it better). 
* Working on glitch integration of locally hosted work + managing comments API

**Sarah:**

* Working on adding some recipes for testing demo.
* Scrape hundreds of recipes from different recipe websites, make it a JSON object, and add it into our database. 
* Held weekly group standup meetings to check the backend/ frontend team’s progress.
* Communcatiated with TA to update our features’ progress