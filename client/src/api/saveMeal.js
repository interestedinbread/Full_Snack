export const saveMeal = async (meal) => {

    try{
        const res = await fetch('http://localhost:3000/api/meals/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( meal ),
    })

    if(!res.ok) {
        throw new Error(`Failed to save meal: ${res.status}`);
    }

    const data = await res.json();
    return data;
    } catch (err) {
        console.error('Error saving meal:', err);
        throw err;
    }
    
}