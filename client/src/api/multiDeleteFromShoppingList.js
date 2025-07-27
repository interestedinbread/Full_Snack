import { API_BASE_URL } from "./config";

export const multiDeleteFromShoppingList = async (ids) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token

    if (!token) {
    throw new Error('User not authenticated');
    }

    try {
        const result = await fetch(`${API_BASE_URL}/api/list/delete-multiple`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ids })
        })

        if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`Failed to delete items: ${result.status} - ${errorText}`);
        }

        const data = await result.json()
        return data
    } catch (err) {
        console.error('Multi delete failed', err)
    }
}