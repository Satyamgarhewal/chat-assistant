const Response = require("../../../app/common/apiResponses");
const { errorConstants } = require("../../../app/utils/constants");
const { myAssistant } = require("../../../app/libraries/open-ai.library");

const chatbot = async (event) => {
  try {
    console.log("inside post handler ====>");
    const body = JSON.parse(event.body);
    const prompt = body.prompt;
    const threadId = body.threadId;
    console.log("prompt provided ------>", prompt);
    if (prompt.length) {
      const response = await myAssistant(threadId, prompt);
      return Response._200({
        message: response,
      });
    } else {
      return Response._400({
        message: errorConstants.NO_PROMPT_PRESENT,
      });
    }
  } catch (err) {
    console.error("error in post handler ---->", err);
    return Response._400(err);
  }
};

exports.handler = chatbot;
