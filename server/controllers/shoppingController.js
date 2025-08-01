const pool = require('../config/db')

exports.multiAddToShoppingList = async (req, res) => {
    const { items } = req.body
    const userId = parseInt(req.user.id)
    const is_checked = false

    if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'No items provided' });
    }

    try {
        const existingQuery = `
        SELECT item_name FROM shopping_list
        WHERE user_id = $1 AND item_name = ANY($2::text[])
        `;

        const existingResult = await pool.query(existingQuery, [userId, items]);

        const existingItemNames = existingResult.rows.map(row => row.item_name);

        const newItems = items.filter(item => !existingItemNames.includes(item))

        let insertedItems = []
        if (newItems.length > 0){
            const insertValues = newItems.map((_, i) => `($1, $${i + 2}, $${newItems.length + 2})`).join(', ');
            const insertQuery = `
            INSERT INTO shopping_list (user_id, item_name, is_checked)
            VALUES ${insertValues}
            RETURNING *
            `;

            const insertParams = [userId, ...newItems, is_checked];

            const insertResult = await pool.query(insertQuery, insertParams);
            insertedItems = insertResult.rows;
        }

        res.status(200).json({
            message: "Bulk add complete",
            added: insertedItems,
            skipped: existingItemNames,
        })
    } catch (err) {
        console.error('Bulk insert failed', err)
        res.status(500).json({ message: 'Failed to add items to shopping list' });
    }
}

exports.addToShoppingList = async (req, res) => {
    const { item_name } = req.body
    const userId = parseInt(req.user.id)
    const is_checked = false

    try {

        const existing = await pool.query('SELECT * FROM shopping_list WHERE user_id = $1 and item_name = $2',
            [userId, item_name]
        )

        if(existing && existing.rows.length > 0){
            return res.status(200).json({ message: 'Item already exists', item: existing.rows[0]})
        }

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
    const { id } = req.params
    
    try{
        const result = await pool.query('DELETE FROM shopping_list WHERE id = $1 RETURNING *',
            [id]
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

exports.multiDeleteFromShoppingList = async (req, res) => {
    const { ids } = req.body;

    if(!Array.isArray(ids) || ids.length === 0){
        return res.status(400).json({ message: "No item ids provided"})
    }

    try{
        const result = await pool.query(
            'DELETE FROM shopping_list WHERE id = ANY($1::int[]) RETURNING *',
        [ids]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'No items found to delete' });
    }

    res.status(200).json({
      message: 'Items deleted',
      deletedCount: result.rowCount,
      deletedItems: result.rows
    })

    } catch (err) {
        console.error('Error deleting items:', err);
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