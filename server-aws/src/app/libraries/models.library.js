const gptModel = `${process.env.GPT_MODEL}`;
const constants = require("../common/constants");

const openAIparams = (prompt) => {
  const { role, temperature, maxTokens } = constants;
  return {
    messages: [{ role: role, content: `${prompt}` }],
    model: gptModel,
    max_tokens: maxTokens,
    temperature: temperature,
  };
};

module.exports = { openAIparams };
