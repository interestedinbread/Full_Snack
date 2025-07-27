import { API_BASE_URL } from "./config";

export const getMultiChoiceMealSuggestions = async (preferences) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token
    
    if (!token) {
    throw new Error('User not authenticated');
    }
    
    try {
        

        const response = await fetch(`${API_BASE_URL}/api/meals/multichoice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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