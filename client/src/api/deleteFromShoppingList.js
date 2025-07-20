export const deleteFromShoppingList = async (itemId) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token
    try {
        const response = await fetch(`http://localhost:3000/api/list/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw new Error(`Failed to delete item. Status: ${response.status}`);
        }

        const data = await response.json()
        return data
    } catch (err) {
        console.error('Error deleting item:', err)
        throw err
    }
}