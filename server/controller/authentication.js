const repository = require('../repository/users')
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

async function generateToken(req, res) {
    try {
        const user = req.body;
        const bdUser = (await repository.getByEmail(user.email)).shift();
        if(user.email === bdUser.email && user.senha === bdUser.senha){
            const token = jwt.sign({userId: 1}, process.env.SECRET, {expiresIn: 300});
            res.json({auth: true, token});
        }
        res.status(401).end();
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
}

async function verifyToken(req, res, next) {
    try {
        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.SECRET, (err, decoded) =>{
            if(err) 
                return res.status(401).send();

            req.userId = decoded.userId;
            next();
        });
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
}

module.exports = {
    generateToken,
    verifyToken
}