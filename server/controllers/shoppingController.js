const pool = require('../config/db')

exports.addToShoppingList = async (req, res) => {
    const { item_name } = req.body
    const userId = parseInt(req.user.id)
    const is_checked = false

    try {
        const result = await pool.query(`INSERT INTO shopping_list (user_id, item_name, is_checked) 
            VALUES ($1, $2, $3)
            RETURNING *`,
        [userId, item_name, is_checked]
        )
        res.status(200).json({ message: 'Item saved', item: result.rows[0]})
    } catch (err) {
        console.error('Could not save to shopping list:', err);
        res.status(500).json({ message: 'Failed to save item to shopping list' });
    }
}

exports.deleteFromShoppingList = async (req, res) => {
    const { itemId } = req.body

    try{
        result = await pool.query('DELETE * FROM shopping_list WHERE id = $1',
            [itemId]
        )

        if(result.rowCount === 0){
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted', deletedItem: result.rows[0] });
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getShoppingList = async (req, res) => {
    const userId = parseInt(req.user.id)
    try{
        const result = await pool.query(`SELECT * FROM shopping_list WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId]
        )
        res.status(200).json({items: result.rows})
    } catch(err) {
        console.error('Error fetching shopping list:', err);
        res.status(500).json({ message: 'Failed to fetch shopping list' });
    }
}