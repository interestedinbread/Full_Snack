import { API_BASE_URL } from "./config"

export const deleteSavedMeal = async (mealId) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token

    try{
        const response = await fetch(`${API_BASE_URL}/api/meals/${mealId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw new Error(`Failed to delete meal. Status: ${response.status}`)
        }

        const data = await response.json()
        return data

    } catch (err) {
        console.error('Error deleting item', err)
        throw err
    }
}