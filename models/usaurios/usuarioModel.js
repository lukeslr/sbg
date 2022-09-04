const {Sequelize, DataTypes } = require('sequelize');
const dataBase = require('../../db/db')

const Usuario = dataBase.define('usuarios',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
      },
    senha: {
          type: DataTypes.STRING,
          allowNull: false
        },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


module.exports = Usuario