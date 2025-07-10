const bcrypt = require('bcryptjs')
const pool = require('../config/db')
const { generateToken } = require('../utils/jwt')

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        // check if email already exists in db
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if(userExists.rows.length > 0){
            return res.status(400).json({ message: 'Email is already registered' })
        }

        // encrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // insert new user into db
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        )

        const user = newUser.rows[0]

        const token = generateToken(user.id);

        // return user object and jwt
        res.status(201).json({
            user,
            token
        });
    } catch (err) {
        console.error('Error in registerUser:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try{
        // check if user exists in db
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        const user = userResult.rows[0]

        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // check password for match
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // create token
        const token = generateToken(user.id);

        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token,
        })
    } catch (err){
        console.error('Error in loginUser:', err);
        res.status(500).json({ message: 'Server error' });
    }
}