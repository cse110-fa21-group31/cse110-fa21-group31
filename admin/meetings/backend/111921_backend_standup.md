Topic: 5th backend team meeting:  Updating the progress

Data: 11/19

People attended: Celia, Kian, Xin, Sarah, Eric, Bjorn

Xin

* Refactor the user login code in parts of back/front 
* Change title headings

Kian

* Focus on the pipeline
* Added linter and formatter job, but failing 
* Many HTML fail on, maybe the front end needs to be fixed?
* Need finalized styling to make some rules for pipeline
* Ask help if needed

Bojn

* Search function working- database
* Using neDB 
* Work on searchByName searchById function

Eric

* Heroku doesn’t work because of ephemeral file system
* Find hosting tech that supports nodeJS and particularly neDB
* Find example of hosting neDB with glitch
* Potential candidates:
    * Glitch.com
    * Platform.sh
* Integrated about comments: need to research how to integrate Disqus with our new hosting tech
*   Got a build working with an nedb demo on Glitch(most likely choice)
* Got comments demo working on Platform.sh
Question: how to host server, integrated with front end and put into db


Rule for backend:

* Anything is not related to HTML, or everything related to third party db, put them in source/service
* Anything related to HTML or CSS should go into source/scripts
* Celia and Eric can working on db
* Rest people working on add/delete/update/get function in ./service/neDB/*


**To-do:**

* Mvp
* Video on monday
* Kian: keep working on the pipeline, maybe MVP if have time, finish local db?
* Bojn: filling out ./neDB/interface.js
* Xin: 
* finish integration on login page
* Check with frontend team making sure is working
* Help Celia if have time

**Assign 2-3 hrs to working together to have code done: Sunday morning 10am (in person if room available)**
