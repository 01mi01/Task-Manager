const express = require('express');
const { Sequelize } = require("sequelize");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const authToken = require('./middleware/auth');

dotenv.config();
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME || "db_taskmanager",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "sql123456789",
  {
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: "postgres",
  }
  ); 

  const corsOptions = {
    origin: process.env.FRONTEND_URL || "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  };
  
app.use(cors(corsOptions));

app.use('/api/auth', userRoutes);  
app.use('/api/tasks', authToken, taskRoutes); 

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
 .then(() => console.log("Conectado a PostgreSQL"))
 .catch((err) => console.error("Error al conectar con PostgreSQL:", err));


app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT} (Sequalize)`)
);

module.exports = app;
