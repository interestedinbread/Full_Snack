export const addToShoppingList = async (item) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token

    try{
        const result = await fetch('http://localhost:3000/api/list/add', {
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