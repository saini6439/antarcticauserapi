# Antarctica User Api

NodeJS + MongoDB API for User Details, Authentication and Registration

## Local setup instructions
+ Clone the project from source
```shell
git clone https://github.com/saini6439/antarcticauserapi.git
```
+ Intall NPM packages
```shell
npm install
```
+ Configure mongodb and secret key in config.js file
```shell
in my case it's mongodb://localhost/EmployeeDB
host: localhost
database name: EmployeeDB
```
+ Now Start application
```shell
npm start
```
+ How to register a new user with Postman
```
To register a new user with the api follow these steps:

1.Open a new request tab by clicking the plus (+) button at the end of the tabs.
2.Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
2.In the URL field enter the address to the register route of your local API - http://localhost:4000/users/register or https://antarcticauserapi.herokuapp.com/users/register.
4.Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON (application/json)".
5.Enter a JSON object containing the required user properties in the "Body" textarea, e.g:
{
    "firstName": "jagdish",
    "lastName": "saini",
    "email": "saini6439@gmail.com",
    "employee_id":"1121",
    "organization":"TCPL",
    "password": "your password"
}
6.Click the "Send" button, you should receive a "200 OK" response with an empty JSON object in the response body.
```
+ How to authenticate a user with Postman
```
To authenticate a user with the api and get a JWT token follow these steps:

1.Open a new request tab by clicking the plus (+) button at the end of the tabs.
2.Change the http request method to "POST" with the dropdown selector on the left of the URL input field.
3.In the URL field enter the address to the authenticate route of your local API - http://localhost:4000/users/authenticate or https://antarcticauserapi.herokuapp.com/users/authenticate.
4.Select the "Body" tab below the URL field, change the body type radio button to "raw", and change the format dropdown selector to "JSON (application/json)".
5.Enter a JSON object containing the username and password in the "Body" textarea:
{
    "email": "your email id",
    "password": "your password"
}
6.Click the "Send" button, you should receive a "200 OK" response with the user details including a JWT token in the response body, make a copy of the token value because we'll be using it in the next step to make an authenticated request.
```
+ How to make an authenticated request to retrieve all users
```
To make an authenticated request using the JWT token from the previous step, follow these steps:

1.Open a new request tab by clicking the plus (+) button at the end of the tabs.
2.Change the http request method to "GET" with the dropdown selector on the left of the URL input field.
3.In the URL field enter the below end points with details:
    1. Search using First Name, Last Name and employeeID : http://localhost:4000/users?firstname=jagdish&lastname=saini&emp_id=10358 or https://antarcticauserapi.herokuapp.com/users?firstname=jagdish&lastname=saini&emp_id=10358
    2. Pagination : http://localhost:4000/users?pageNo=1&size=10 or https://antarcticauserapi.herokuapp.com/users?pageNo=1&size=10
    3. Get all users : http://localhost:4000/users or https://antarcticauserapi.herokuapp.com/users

4. In header enter "Authorization" in key field and your token into values field along with Bearer keyword "Bearer yourtoken".
5. Click the "Send" button, you should receive a "200 OK" response containing a JSON array result.
```
