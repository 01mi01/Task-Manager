const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

router.get('/users', getUsers);

router.post('/users', createUser);

router.get('/users/:id', getUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;