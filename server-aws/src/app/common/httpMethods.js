const axios = require("axios");

const POST = async (endpoint, params, headers) => {
  try {
    const response = await axios.post(endpoint, params, { headers });
    return response;
  } catch (error) {
    console.error(error.data.error);
    return error;
  }
};

module.exports = { POST };
