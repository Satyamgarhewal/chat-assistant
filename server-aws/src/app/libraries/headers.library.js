const apiKey = `${process.env.OPEN_AI_API_KEY}`;

const headers = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

const apiHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Origin": "*",
};

module.exports = { headers, apiHeaders };
