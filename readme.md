# Student Example

This example kata is designed to test Javascript competency, specifically for NodeJS.
The goal of this kata is to create a simple API that shows student test scores for two tests.

Unfortunately, the app isn't finished, so it is your job to finish the app.

### Requirements

The requirements here is to build a JSON API that returns the following information:

* /students - returns a list of each student, their age, and their grade level. Their name is not displayed here.
* /students/:id - returns the student, as well as any tests that they have taken, the score for each test, and the date each test was taken.
* /tests - returns a list of each test and the dates when the students took them. These should be grouped by the test and then the date the each test was administered.

In addition to this, each API have integration tests to show that their data is correct.


### Data
We need tables that store the following information:

1. Students
    * A unique ID that the student can use to view their test information.
    * The student's name.
    * The student's age.
    * The student's grade level, as a number

2. Tests
    * A unique ID to represent the test.
    * The name of the test.
    * The maximum score that can be achieved on the test.

3. Student Attempts
    * Indicate which student the attempt is for
    * Indicate which test the student has taken
    * The student's score
    * The date the student took the test

### Existing Product Description

Our last developer decided to pursue a career in decorative baking. He managed to complete the first task
and part of the second task, but it isn't working properly. He also set up tests for the second and third
routes, but the third test is incomplete.

For development purposes, since the application is small, he decided to do the simple bits of
database development using a local sql database utility called Sqlite. The way it is currently set up
is that the database will always refresh itself when the server is restarted. This amounts to recreating
the database in memory, using one of Sqlite's features.

After the database is created, then the schema of the database is also developed by running scripts
in the schema directory. These run in alphabetical order, and contain scripts to build the tables.

Afterwards, in a fashion similar to the schema statements, seed data is populated into the database
from scripts in the seed directory.

The schema is currently incomplete because the attempts table still needs to be specified.

### Starting The Server

You can start the server from the terminal by locating the directory and typing "npm start" into the console.
You can also manually run the server by doing "node ./bin/www" from the same location.

You can run the tests from the same location by typing "npm test" in the same directory.

Every time you make a code change, you will need to restart the server to see the code changes take effect.

### Viewing The Routes

Once the server has been started, it will be available in your browser at http://localhost:3000

To view the /students route, you will need to go to http://localhost:3000/students.

It may be helpful to download a Chrome app called Postman and do the requests from there,
to get pretty-printed JSON. This isn't necessary though.

### Helpful Links

##### Sqlite
Go here to learn about the API documentation for the Sqlite lbirary to query the Sqlite database.
https://github.com/mapbox/node-sqlite3/wiki

##### Express
Go here to learn about how express works.
http://expressjs.com/en/api.html