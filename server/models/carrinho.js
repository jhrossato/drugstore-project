const DataTypes = require('sequelize');
const sequelize = require('../database/db');


const Carrinho = sequelize.define('Carrinho', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Carrinho;
