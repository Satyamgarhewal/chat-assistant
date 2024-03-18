const { apiHeaders } = require("../libraries/headers.library");
const Responses = {
  _200(data = {}) {
    console.log("data fetched in 200", data);
    return {
      apiHeaders,
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },
  _400(data = {}) {
    return {
      apiHeaders,
      statusCode: 400,
      body: JSON.stringify(data),
    };
  },
};

module.exports = Responses;
