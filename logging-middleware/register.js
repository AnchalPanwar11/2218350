// register.js

const axios = require('axios');

const registrationData = {
  email: "panwaranchal2511@gmail.com",
  name: "Anchal Panwar",
  mobileNo: "8218256286",
  githubUsername: "AnchalPanwar11",
  rollNo: "2218350",
  accessCode: "QAhDUr"  // Replace this with the one emailed to you
};

axios.post('http://20.244.56.144/evaluation-service/register', registrationData)
  .then(response => {
    console.log("✅ Registration Successful!");
    console.log("Client ID:", response.data.clientID);
    console.log("Client Secret:", response.data.clientSecret);
  })
  .catch(error => {
    console.error("❌ Registration Failed:", error.response?.data || error.message);
  });
