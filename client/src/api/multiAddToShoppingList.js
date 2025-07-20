export const multiAddToShoppingList = async (items) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token

    if (!token) {
    throw new Error('User not authenticated');
    }

    try {
        const result = await fetch('http://localhost:3000/api/list/add-multiple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ items })
        })

        if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`Failed to save items: ${result.status} - ${errorText}`);
        }

        const data = await result.json()
        return data
    } catch (err) {
        console.error('Multisave failed', err)
    }
}