const getShoppingList = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user?.token

    try{
        const response = await fetch('http://localhost:3000/api/list/get',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })

        if(!response.ok){
            const errorText = await response.text()
            console.error('Backend error response:', errorText)
            throw new Error('Failed to fetch meal suggestions');
        }

        const data = await response.json()
        return data
    } catch(err) {
        console.error('Could not retrieve shopping list', err)
        throw err
    }
}