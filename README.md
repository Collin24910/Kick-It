# Kick-it-Social-Media-MERN-Stack

This is a MERN stack web application designed to track a persons habits that they would like to kick. As well as including social media features such as profiles, posting, commenting, and liking. This application takes full advantage of user authentication with JWT tokens.

# Objective

This web app was designed with the perpose of connecting indeviduals who have a desier to quit a habbit or addiction. With the ability to track you progress through real time and shair your experience with others.

# Set up runtime envirnment

1. Clone or download repository.
2. Open directory and run npm install.
3. Open client directory and run npm install.

This application uses a mongoDB Atlas account. To create a mongoDB Atlas account go [here](https://www.mongodb.com/cloud/atlas#:~:text=MongoDB%20Atlas%20is%20the%20global,data%20security%20and%20privacy%20standards.).

1. Log into Atlas account and create a cluster then click "Connect".
2. Whitelist a connection IP address and create a MongoDB user.
3. Once connected choose "Connect Your Application"
4. Replace the mongoURI string in key.js with the connection string. Replace <user> and <password> with your username and password.
5. Return to the main directory and run npm dev. You can access the site on localhost:3000.

# This application was build useing

- Node.js: Run time envirnment
- Express.js: Backend frameword
- Reactjs: User interface useing JavaScript
- JSON Web Token: Secure HTTP requests
- MongoDB: Database for storing data
- Mongoose: Modeling tool for Node.js
- Material-UI: User interface library for React
- AWS: Amazon web service, hosts this application demo.

# Acknowlegment

- Much of the design was inpired by pre existing projects like Qolzam's
  [js-react-social-tutorial](https://github.com/Qolzam/js-react-social-tutorial) and ThomasFoydel [socialmedia](https://github.com/ThomasFoydel/socialmedia)
- Authentication was completed with the help of guides by
  Ben Awad [React Client Side Authentication](https://www.youtube.com/watch?v=oRL-pttfNSc) and Taylor Ray Howard [Using JWT Authentication in React](https://www.youtube.com/watch?v=Nq9RmAB9eag)
- Documentation for tools used: [Material-UI](https://material-ui.com/), [Mongoose](https://mongoosejs.com/), [React](https://reactjs.org/)
