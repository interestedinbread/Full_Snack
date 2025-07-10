const { OpenAI } = require('openai')
require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateMeals = async (req, res) => {
  const { ingredients } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful recipe generator.",
        },
        {
          role: "user",
          content: `Give me 3 meal ideas using these ingredients: ${ingredients.join(', ')}. You can give suggestions that include a few other ingredients not included in this request.
          
          Return the result as a clean JSON array with no backticks. Each meal object should have:
            - "id"
            - "title"
            - "ingredients" (array of strings)
            - "time_required" (number in minutes)
            - "instructions" (array of at least 4 steps).

            Example:
            [
            {
                "id": 1,
                "title": "Tomato Pasta",
                "ingredients": ["tomatoes", "pasta", "olive oil", "garlic"],
                "time_required": 25,
                "instructions": ["Boil pasta.", "Sauté garlic in olive oil.", "Add tomatoes and simmer.", "Combine with pasta and serve."]
            }
            ]`,
        },
      ],
    });

    const reply = response.choices[0].message.content;
    const parsedReply = JSON.parse(reply)
    res.json({ suggestions: parsedReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch suggestions from OpenAI' });
  }
}