const DataTypes = require('sequelize');
const sequelize = require('../database/db');

const Usuario = sequelize.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    adm:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});


module.exports = Usuario;