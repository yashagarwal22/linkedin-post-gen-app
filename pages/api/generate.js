import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
  // Run first prompt
  const composedPrompt = `Write me a compelling essay about ${req.body.userInput} in the style of Paul Graham and Naval Ravikant. Each paragraph should have a strong hook, some examples, and a clear conclusion. The last paragraph should include a strong Call to Action.`;
  console.log(`API: ${composedPrompt}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${composedPrompt}`,
    temperature: 0.7,
    max_tokens: 2000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
