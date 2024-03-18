const { openAIparams } = require("../libraries/models.library");
const { headers } = require("../libraries/headers.library");
const { POST } = require("../common/httpMethods");
const OpenAI = require("openai");

const openAiTrigger = async (prompt) => {
  try {
    const endpoint = `${process.env.CHAT_COMPLETION}`;
    const body = openAIparams(prompt);
    const response = await POST(endpoint, body, headers);
    return response;
  } catch (error) {
    console.error(`Error calling OpenAI API: ${error}`);
    return error;
  }
};

const myAssistant = async (threadId, prompt) => {
  try {
    console.log("=====prompt received =====>", prompt);
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });
    const assistant = await openai.beta.assistants.create({
      name: "Code Instructor",
      instructions:
        "You are a personal code instructor. Write and run code to answer coding questions.",
      tools: [{ type: "code_interpreter" }],
      // model: "gpt-4-1106-preview"
      model: `${process.env.GPT_MODEL}`,
    });
    console.log("under assistant  ------------------>", assistant.id);
    if (!threadId.length) {
      const thread = await openai.beta.threads.create();
      threadId = thread.id;
    }
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: prompt,
    });

    console.log("message received ====>", message);

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistant.id,
      instructions:
        "Please address the user as Jane Doe. The user has a premium account.",
    });
    const asstRun = await openai.beta.threads.runs.retrieve(threadId, run.id);
    console.log("asstRun response =====>", asstRun);

    const messages = await openai.beta.threads.messages.list(threadId);
    console.log("messages received ----->", messages.data);

    return messages.data;
  } catch (err) {
    console.error("Error in chat bot =====>", err);
    return err;
  }
};

module.exports = { openAiTrigger, myAssistant };
