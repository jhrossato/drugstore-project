const DataTypes = require('sequelize');
const sequelize = require('../database/db');


const Categoria = sequelize.define('Categoria', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = Categoria;