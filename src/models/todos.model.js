//importamos db

const db = require('../utils/database');
const { DataTypes } = require('sequelize');


const Todos = db.define('todos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  },
}, {
  timestamps: false,
});

module.exports = Todos;