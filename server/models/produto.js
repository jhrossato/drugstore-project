const DataTypes = require('sequelize');
const sequelize = require('../database/db');
const Categoria = require('./categoria')

const Produto = sequelize.define('Produto', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    marca:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fabricante:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sobre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    preco:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    estoque:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

//Categoria.hasMany(Produto, { as: 'categoria' });

Produto.belongsTo(Categoria, { as: 'categoria' });

module.exports = Produto;