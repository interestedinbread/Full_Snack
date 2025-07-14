export const getMultiChoiceMealSuggestions = async (preferences) => {
    try {
        const response = await fetch('http://localhost:3000/api/meals/multichoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ preferences }),
        })

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Backend error response:', errorText);
            throw new Error('Failed to fetch meal suggestions');
        }

        const data = await response.json();
        return data.suggestions
    } catch (error){
        console.error('Error fetching meal suggestions:', error);
        throw error;
    }
}