const express = require('express');
const router = express.Router();

const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

router.get('/tasks', getTasks);

router.post('/tasks', createTask);

router.get('/tasks/:id', getTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

module.exports = router;