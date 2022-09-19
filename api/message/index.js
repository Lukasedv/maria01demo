

module.exports = async function (context, req) {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
    const openai = new OpenAIApi(configuration);
    



    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(req.body.company),
        temperature: 0.5,
        max_tokens: 128,
      });

    context.res.json({
        text: completion.data.choices[0].text
    });

    function generatePrompt(company) {
        return `Create a startup pitch.
        Name and industry: ${company}
        Pitch:`;
      }
};