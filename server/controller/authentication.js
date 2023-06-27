const repository = require('../repository/users')
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

async function generateToken(req, res) {
    try {
        const user = req.body;
        const bdUser = (await repository.getByEmail(user.email)).shift();
        if (bdUser === null || bdUser === undefined){
            return res.status(401).json({err:'Conta não cadastrada!'});
        }
        else if(user.email === bdUser.email && user.senha === bdUser.senha){
            const token = jwt.sign({userId: bdUser.id}, process.env.SECRET, {expiresIn: 7200});
            return res.json({auth: true, token, userId: bdUser.id, nome: bdUser.nome, adm: bdUser.adm});
        }
        else if (user.senha !== bdUser.senha){
            return res.status(401).json({err:'Senha inválida, tente novamente!'});
        }
        return res.status(401).json({err:'Erro ao realizar login!'});
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

async function isAuth(req, res, next) {
    try {
        const token = req.headers['x-access-token'];
        jwt.verify(token, process.env.SECRET, (err, decoded) =>{
            if(err) 
                return res.status(401).json({auth: false});
            res.status(200).json({auth: true});
        });
    } catch (error) {
        res.status(500).send('Internal Server Error: ' + error.message)
    }
}

module.exports = {
    generateToken,
    verifyToken,
    isAuth
}