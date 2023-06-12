//gestionar la conexion con una base de datos
// Importar squelize

const { Sequelize } = require('sequelize');
require('dotenv').config;

// crear una instancia de squelize con la configuracion de conexion

const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions:{ssl:{require:true, rejectUnauthorized}}
});


module.exports = db;