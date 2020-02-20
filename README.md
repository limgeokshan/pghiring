# pghiring
Repository for pgHiring technical assessment

## setting up in localhost


**To setup and load data into database in local environment**
run `pghiring.sql` script in mysqlserver


**To run in development -- localhost**
Development Server runs on port 3000

`npm install`

`npm node start.js`


## Accessing hosted endpoints
http://18.141.141.84/api/:endpoints
P/S: Please change endpoints according to below API guidelines


## API

POST `/api/register`
: Register one or more students to a specified teacher

GET `/api/commonstudents`
: Retrieve a list of students common to a given list of teachers

POST `/api/suspend`
: Suspend a specified student

POST `/api/retrievefornotifications`
: Retrieve a list of students who can receive a given notification.

Details of API requirements: https://gist.github.com/pghiring/106b90b625d10d0c9e558c540c475e4f
