const express = require('express');
const app = express();

const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');

app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT} (Sequalize)`)
);

module.exports = app;