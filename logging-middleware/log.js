// log.js
const axios = require("axios");
require("dotenv").config();

const BASE_URL = "http://20.244.56.144/evaluation-service/logs";

async function Log(stack, level, packageName, message) {
  try {
    const token = process.env.ACCESS_TOKEN;
    console.log("🪪 Loaded Token:", token); 

    const payload = {
      stack,
      level,
      package: packageName,
      message
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    const response = await axios.post(BASE_URL, payload, { headers });
    console.log("✅ Log sent:", response.data);
  } catch (error) {
    console.error("❌ Log failed:", error.response?.data || error.message);
  }
}

module.exports = Log;
