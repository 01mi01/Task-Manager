const express = require('express');
const authToken = require('../middleware/auth'); 
const router = express.Router();

const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

router.use(authToken); 

router.get('/', getTasks); 
router.post('/', createTask); 
router.get('/:id', getTask); 
router.put('/:id', updateTask); 
router.delete('/:id', deleteTask);

module.exports = router;