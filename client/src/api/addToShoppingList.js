import { API_BASE_URL } from "./config";

export const addToShoppingList = async (item) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token

    if (!token) {
    throw new Error('User not authenticated');
    }

    try{
        const result = await fetch(`${API_BASE_URL}/api/list/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({item_name: item})
        })
        if(!result.ok){
            throw new Error(`Failed to save item: ${result.status}`);
        }

        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error saving item:', err);
        throw err;
    }
}