
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: "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",
});

async function chatCompletion(req, res) {

  await openai.chat.completions
    .create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
    })
    .then((response) => {
      console.log(response);
    });
}

module.exports =  {chatCompletion} ;
