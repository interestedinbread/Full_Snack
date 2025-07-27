import { API_BASE_URL } from "./config";

export const getSavedMeals = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token

    if (!token) {
    throw new Error('User not authenticated');
    }
    
    try{
        const response = await fetch(`${API_BASE_URL}/api/meals/saved`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            const errorText = await response.text()
            console.error('Backend error response:', errorText)
            throw new Error('Failed to fetch meal suggestions');
        }
        const data = await response.json()
        return data
    } catch (err) {
        console.error('Error getting saved meals', err)
        throw err
    }
}