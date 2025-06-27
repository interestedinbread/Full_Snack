const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv').config()
const { OpenAI } = require('openai')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/meals', async (req, res) => {
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
          
          Return the result as a JSON array. Each meal object should have:
            - "id"
            - "title"
            - "ingredients" (array of strings)
            - "time_required" (number in minutes)
            - "instructions" (string of at least 4 steps).

            Example:
            [
            {
                "id": 1,
                "title": "Tomato Pasta",
                "ingredients": ["tomatoes", "pasta", "olive oil", "garlic"],
                "time_required": 25,
                "instructions": "1.) Boil pasta. 2.) Sauté garlic in olive oil. 3.) Add tomatoes and simmer. 4.) Combine with pasta and serve."
            }
            ]`,
        },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ suggestions: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch suggestions from OpenAI' });
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})