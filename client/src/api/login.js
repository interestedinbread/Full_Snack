export const loginUser = async (credentials) => {
    try{
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Login failed');
        return result
    } catch (error) {
        console.error('Error logging in:', error)
    }
}