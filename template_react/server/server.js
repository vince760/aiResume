const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: "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",
});
const corsOptions = {
  origin: "http://localhost:3001/api/",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/ping", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/generate", async (req, res) => {
  await openai.chat.completions
    .create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
    })
    .then((response) => {
      res.json(response.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/api/skills", async (req, res) => {
  let jobTitle = req.body.desiredJob;

  await openai.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `give me a list of 5 skills in array format for a resume "skills" section, each item in the list should be an object with the key being its focus and 5 items as its value for the job title of ${jobTitle}`,
        },
      ],
      model: "gpt-3.5-turbo",
    })
    .then((response) => {
      res.send(response.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/api/summary", async (req, res) => {
  let summary = req.body.summary;

  await openai.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content:
            "write an about me seciton with no more than 500 characters based off of my linkedin profile or summary provided, do not write in third person only write describing myself using I",
        },
        {
          role: "user",
          content: `${summary}`,
        },
      ],
      model: "gpt-3.5-turbo",
    })
    .then((response) => {
      res.send({ summary: response.choices[0].message.content });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/api/employement", async (req, res) => {
  let employment = req.body.employment;

  let messages = employment.map(async (message) => {
    return new Promise((resolve, reject) => {
      openai.chat.completions
        .create({
          messages: [
            {
              role: "system",
              content:
                "You will be provided with a employment history, and your task is rewrite my employment history description and bullet points to a more professional description with keywords that will be picked up on resume scanners,If provided, give a summary of the company as the first sentence, do not include the companies name within the first sentance, followed by key points as bullet points about what the job entails .",
            },
            {
              role: "user",
              content: message.employment.description,
            },
          ],
          model: "gpt-3.5-turbo",
          temperature: 1.0,
        })
        .then((response) => {
          resolve([response.choices[0].message.content]);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  });

  await Promise.all(messages)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
