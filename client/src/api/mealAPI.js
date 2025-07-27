import { API_BASE_URL } from "./config";

export const getMealSuggestions = async (ingredients) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/meals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients }),
        })

        const data = await response.json();
        return data.suggestions
    } catch (error){
        console.error('Error fetching meal suggestions:', error);
        throw error;
    }
}