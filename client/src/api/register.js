export const registerUser = async (userInfo) => {

    try{
        const response = await fetch('http://localhost:3000/api/auth/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })
        
        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Registration failed');
        return result

    } catch (err) {
        console.error('Could not register user:', err)
    }
}