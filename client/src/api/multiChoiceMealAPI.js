export const getMultiChoiceMealSuggestions = async (preferences) => {
    try {
        const response = await fetch('http://localhost:3000/api/meals/multichoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ preferences }),
        })

        const data = await response.json();
        return data.suggestions
    } catch (error){
        console.error('Error fetching meal suggestions:', error);
        throw error;
    }
}