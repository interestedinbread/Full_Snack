export const getPromptGenerateMeals = async (promptString) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = user?.token

        if(!token){
            throw new Error ('User is not authenticated')
        }

        const response = await fetch('http://localhost:3000/api/meals/prompt', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ prompt: promptString})
            })
        
        if(!response.ok){
            const errorText = await response.text()
            console.error('Backend error response:', errorText)
            throw new Error('Failed to fetch meal suggestions');
        }

        const data = await response.json();
        return data.suggestions
    } catch (err) {
        console.error('Error fetching meal suggestions:', err);
        throw err;
    }
}