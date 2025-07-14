export const getPromptGenerateMeals = async (promptString) => {
    try {
        const response = await fetch('http://localhost:3000/api/meals/prompt', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: promptString})
            })
        
        if(!response.ok){
            const errorText = await response.text()
            console.error('Backend error response:', errorText)
            throw new Error('Failed to fetch meal suggestions');
        }

        const data = await response.json();
        return data.suggestions
    } catch (err) {
        console.error('Error fetching meal suggestions:', err);
        throw err;
    }
}