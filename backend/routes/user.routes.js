const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const {
  registerUser,
  loginUser
} = require('../controllers/auth.controller');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/users', getUsers);

router.post('/users', createUser);

router.get('/users/:id', getUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;