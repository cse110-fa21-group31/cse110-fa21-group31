People attended: Celia, Eric, Kian, Xin

Missing: Bjorn (update on discord)

Data: 11/12

Topic: 3rd backend team meeting. Updating the progress about comments, auth, and database

Update on Agile development:

- use Github Project Board to keep track of the tasks
- Briefly show how to use Github Project Board

Auth

- Xin gives a demo about local login with Google API
- OAuth on cloud
- Received user info after login
- Internal consent: only ucsd.edu allowed to login
- External may need verification, research on enabling &#39;.edu&#39; account to login in

Local Storage

- Kian gives a demo about using MongoDB on the local machine
- Contains query and mutation
- Investigate about using local storage

Comments

- Eric gives a demo about using Disqus to store comments
- Could create, update, delete comments dynamically; other users can see the comments
- Datastores in Disqus
- Need Login to comment
- Investigate: how to integrate the user login info about Disqus and our webpage

3rd Party Database

- Celia gies demo using neDB
- Datastores for reading and updating files
- Follow MongoDB API queries and mutations
- Research about storing private information (user profile)
- Create lists of API calls

Database query update:

- Bjorn got a local MongoDB running and figured out how to pull info out of an HTML form to query for documents
- task: integrate this with what the front end team has to get the search functionality working