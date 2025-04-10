const express = require('express');
const app = express();

const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const authToken = require('./middleware/auth');

app.use(express.json());

app.use('/api/auth', userRoutes);  
app.use('/api/tasks', authToken, taskRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT} (Sequalize)`)
);

module.exports = app;
