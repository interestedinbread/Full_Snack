const { OpenAI } = require('openai')
require('dotenv').config()
const pool = require('../config/db')

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
    let cleaned = reply.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
    const parsedReply = JSON.parse(cleaned)
    res.json({ suggestions: parsedReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch suggestions from OpenAI' });
  }
}

exports.multiChoiceGenerateMeals = async (req, res) => {
  const { mealType,
          flavorType, 
          dietPreference, 
          proteinPreference, 
          cuisineType, 
          allergiesOrAvoidances,
          timeAvailable
          } = req.body;

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
          content: `Give me 3 creative ${mealType} meal ideas using these preferences:

          - Flavor profile: ${flavorType}
          - Dietary preferences: ${dietPreference?.join(', ') || 'None'}
          - Preferred protein(s): ${proteinPreference?.join(', ') || 'Any'}
          - Cuisine type(s): ${cuisineType?.join(', ') || 'Any'}
          - Allergies or ingredients to avoid: ${allergiesOrAvoidances?.join(', ') || 'None'}
          - Time available: ${timeAvailable}

          
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

    let parsedReply
    try{
      parsedReply = JSON.parse(response.choices[0].message.content.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']'));
    } catch (err) {
      console.error('Failed to parse OpenAI response:', response.choices[0].message.content);
      return res.status(500).json({ error: 'OpenAI response format error' });
    }

    return res.status(200).json({ suggestions: parsedReply })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch suggestions from OpenAI' });
  }
}

exports.promptGenerateMeals = async (req, res) => {
  const prompt = req.body.prompt;
  
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
  return res.status(400).json({ error: 'Prompt must be a non-empty string.' });
  }

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
          content: `Give me 3 creative meal ideas based on this input: ${prompt.trim()}
          
          Return the result as a clean JSON array with no backticks. Each meal object should have:
            - "id"
            - "title"
            - "ingredients" (array of strings)
            - "time_required" (number in minutes)
            - "instructions" (array of at least 4 steps).

            Each ingredient should only be 1 to 3 words maximum. No lists within ingredient items.

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

    let parsedReply
    try{
      parsedReply = JSON.parse(response.choices[0].message.content.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']'));
    } catch (err) {
      console.error('Failed to parse OpenAI response:', response.choices[0].message.content);
      return res.status(500).json({ error: 'OpenAI response format error' });
    }

    return res.status(200).json({ suggestions: parsedReply })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch suggestions from OpenAI' });
  }
}

exports.saveMeal = async (req, res) => {
  const { title, time_required, ingredients, instructions } = req.body
  const userId = parseInt(req.user.id)

  console.log('User ID:', userId, 'Type:', typeof userId);
  try{
    const result = await pool.query(
      `INSERT INTO saved_meals (user_id, title, time_required, ingredients, instructions)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [userId, title, time_required, ingredients, instructions]
    )

    res.status(201).json({ message: 'Meal saved', meal: result.rows[0] })
  } catch (err) {
    console.error('Error saving meal:', err)
    res.status(500).json({ error: 'Could not save meal' })
  }
}

exports.getSavedMeals = async (req, res) => {
   
  const userId = req.user.id

  try{
    const result = await pool.query(
    `SELECT * FROM saved_meals WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
    );

    res.status(200).json({ meals: result.rows})

  } catch (err) {
    console.error('Error fetching meals:', err)
    res.status(500).json({ error: 'could not fetch saved meals'})
  }
  
}