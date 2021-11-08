People attended: Bjorn, Celia, Eric, Kian, Xin, Serina (welcome:))

Missing: none

Data: 11/08

Topic: second backend team meeting. Going over the progress about comments, auth, and database

- Finalizing features and design
  - Recipe presentation
  - Recipe persistence/creation-- no images for each step
- Database--MongoDB
  - Have MongoDB installed
    - MongoDB native driver; installed using npm <https://www.npmjs.com/package/mongodb> 
  - Local database only:
    - Easy to query based on the array/content about the array
    - Store tags as array string
    - Question about having tags as a separate table?
- Data persistence:
  - Github REST API
  - SQLite--take with TA about this
  - Try to find a MongoDB version about hosting a static website
- Backend in general
  - User system
    - Comments
      - Using gitalk, a dedicated API that stores comments information in a private Github repo
      - Have a demo from the tutorial, going to modify the demo based on our needs (not require the user to login in through Github
    - Auth
      - Database approach: User name and password; encrypt, and then get JSON web token
      - Oauth: store user info in a separate Github repo
  - CI/CD pipeline: have one person review the pull request before the merge
  - Define the sample query to perform CRUD
    - MongoDB query--Bjorn
