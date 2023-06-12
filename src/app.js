// importa express

const express = require('express');
const db = require('./utils/database');
const Todos = require('./models/todos.model');
require('dotenv').config;
const cors = require('cors');


//Creando una instancia de express llamada app

db.authenticate()   //autenticar una conexion, funcion asincrona
  .then(() => console.log('Base de datos conectada'))
  .catch((err) => console.log(err));

db.sync()  // si la tabla no existe la crea...
  .then(() => console.log('Base de datos sincronizada'))
  .catch(error => console.log(error));

const app = express();

app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});


// insert info todos

app.post('/todos', async (req, res) => {
  try {
    //extraemos el cuerpo de la peticion
    const newTodos = req.body;
    //INSERT INTO users (title, description, completed) VALUES()
    await Todos.create(newTodos);
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

// obtener todas las tareas de la bd 
// SELECT * FROM todos;

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todos.findAll();
    res.json(todos);
  } catch (error) {
    res.status(400).json(error)
  }
});

// get todos by id

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const todos = await Todos.findByPk(id);
    res.json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});


// delete todos

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todos.destroy({
      where: {id} 
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});


// update todos

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await Todos.update({title, description}, {
      where: {id}
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});




//dejar escuchando a nuestro servidor en el puerto 8000
app.listen(8000, () => {
    console.log('Servidor escuchando en el puerto 8000');
});