<img width="1440" alt="Screenshot 2021-07-09 at 11 28 41 PM" src="https://user-images.githubusercontent.com/78134776/125118882-f23f6f00-e10d-11eb-8e1e-e6bd30ae9de0.png">


# Actually.js
Our project is a movie ticket booking website. It has sections of Home, Signin/Signup, My Profile, My bookings, etc. We have used Tmdb API for movie database and Razorpay Gateway for payment, which is in test mode. Further these sections will be described in the later part of this README file.

# Hosted URL 
[Kinoticket.com](https://kinoticket.netlify.app)

# Features Implemented
## Frontend
Starting off with the **HOME** page, it begins with:
1. Navigation Bar
   1. Website name and Logo
   2. Search bar
   3. Navigation Sections
      1. Home: Active page
      2.  Movies: _The page under construction_
      3.  Theater: _The page under construction_
      4.  SignIn: Allows the user to SignIn, with a submenu to register himself if not.
2. Container with cards containing:
   1. Movie Title
   2. Ratings 
   3. Overview
3. Footer which as the name suggests is the end of this page has:
   1. Website logo
   2. Social media handles which is also under construction.
   3. About us: This page gives a brief description about the creaters of this website
   4. Contact us: This page lets the user leave his/her queries to us which goes to our database on submission. Also we have given the address where people can reach out to us.
   5. Feedback: This has a link to a google form for the user to leave us a feedback on our website.

Then comes the **other pages** which can be reached using the navigation bar. 

1. SignIn: In this page the user enters his/her email and password in the fields to signIn, on clicking the proceed button one has access to his profile, bookings and also can now book any movies.
2. Register: This page can be reached through the navigation bar as well as with the link in the sigin page. It has fields of name, email, contact, password and confirm password by filling which a person registers himself on our page and can now signin.
3. My Profile: This can also be reached through the navigation bar and has option to reset all the credentials of the user including resetting the password.
4. Bookings: This page also is reached using the navbar and displays all the successful and failed bookings made by the user.

Other than these we have pages to select:

1. Slot date and timings
2. Choice of seats 
3. A page consisting of the button to book the movies, its overview, trailer video and cast can be reached by clicking on the cards in the container of home page.
4. After selection of seats displays a page with the summary of your booking as well as the amount to be paid. It also has a pay now button which directs you to the payment gateway through razorpay API.
5. On payment a page with the booking summary is displayed which also gives you an option to print the ticket. 


## Backend
**(1) Authentication Routes**
 
These routes are for user registration and verification. New user's data is fetched from frontend after checking that all entries are in proper format and then user's data and hashed password is stored in the database.

For existing users the email and password is comapred with priorly entered values and on successfull match A token is given to the user for session.

It also has a route which resets the password on user request by taking token,old password and new password as requset parameters.

**(2) Slot Routes**

These routes handle all the requests regarding :
(1) Availability of a movie on a particular date.
(2) Slots that are vacant.
(3) Information of booked and vacant seats.

**(3) Booking Routes**

These routes contain the following functions :
(1) Blocking the selected seats for 5mins.
(2) Creating order Id for payment.
(3) Displaying all the order details by taking order_Id and user token as request parameters.

**(4) User Routes**

These routes are specially for handling user data. These are used for my profile and my bookings section mentioned in the frontend.


<h3 align="left">Technologies and Libraries used</h3>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a></p>

<h3 align="left">APIs used</h3>
<p> <a href=""> <img src="https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg" alt="Tmdb" width="40" height ="40"/></a><a href=""> <img src="https://woocommerce.com/wp-content/uploads/2021/01/fb-razorpay@2x.png" width="40" height ="40"/></a></p>

## Packages used
1. [Nodemon](https://www.npmjs.com/package/nodemon)
2. [Cors](https://www.npmjs.com/package/cors)
3. [Jwt](https://www.npmjs.com/package/jwt)
4. [bcrypt](https://www.npmjs.com/package/bcrypt)
5. [razorpay](https://www.npmjs.com/package/razorpay)
6. [postgres](https://www.npmjs.com/package/pg)
7. [dotenv](https://www.npmjs.com/package/dotenv)

### Local Setup

1. Fork the repository.
2. Clone the repository (```git clone URL```)
3. Install the packages using the code given  below

```npm i nodemon bcrypt cors express jsonwebtoken pg dotenv razorpay```

4. Create account on razorpay then go into web integration and generate API test key and secret key.
5. Create your own database on ElephantSQL.
6. If you want to use Razorpay payments gateway as well generate your KEY_ID and KEY_SECRET using this link and then substitute it in the .env file.
7. Now you can run ```npm start``` and start working localy.


# Team Members

1. Harsh Mishra (2020IMT-036)
2. Samarjeet Mohite (2020IMT-084)
3. Khushi Soni (2020IMT-045)

To access frontend repository click on [Movie-Frontend](https://github.com/Smr0303/Movie-Frontend.git).

