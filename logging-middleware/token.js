// getToken.js
const axios = require("axios");

const data = {
  email: "panwaranchal2511@gmail.com",
  name: "Anchal Panwar",
  rollNo: "2218350",
  accessCode: "QAhDUr",
  clientID: "51494604-2b1a-4a6f-a836-06d1e2e3cd0a",
  clientSecret: "eaVwHdpARhfbVbZe"
};

axios.post("http://20.244.56.144/evaluation-service/auth", data)
  .then(response => {
    console.log("✅ Token received!");
    console.log("Access Token:", response.data.access_token);
    console.log("Token Type:", response.data.token_type);
    console.log("Expires At (Unix):", response.data.expires_in);
  })
  .catch(error => {
    console.error("❌ Token generation failed:", error.response?.data || error.message);
  });
