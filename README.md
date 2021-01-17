# Email Invitation App
## Overview
The purpose of this app is to send email invitation to the customer with email validation
Steps to play around

1. Click request invitation
2. Fill in three required fields
3. If all the fields are valid, fire http post request to the server otherwise highlight the invalid field
4. when sending email, all the input fields are disabled
5. If everything works fine, the success dialog will pop up otherwise the server will return error message showing below
6. Click 'ok' will close the dialog

## Demo 
![alt text](images/demo.gif)

## key technologies
* TypeScript
* React
* Material UI (for ui components)
* Webpack 
* Formik
* GraphQl
* React-testing library
* Jest

## How to run
* Clone the project and cd into project
* npm install
### `yarn dev`
* yarn dev and go to [link](*http://localhost:9000*)

### `yarn build`
* yarn build for a production build
