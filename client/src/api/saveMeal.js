import { API_BASE_URL } from "./config";

export const saveMeal = async (meal) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token

    if (!token) {
    throw new Error('User not authenticated');
    }

    try{
        const res = await fetch(`${API_BASE_URL}/api/meals/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify( meal ),
    })

    if(!res.ok) {
        throw new Error(`Failed to save meal: ${res.status}`);
    }

    const data = await res.json();
    return data;
    } catch (err) {
        console.error('Error saving meal:', err);
        throw err;
    }
    
}