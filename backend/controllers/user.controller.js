const { User } = require('../models');

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  user
    ? res.json(user)
    : res.status(404).json({ error: 'No se encontró a un usuario con ese ID' });
};

exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'No se encontró a un usuario con ese ID' });
  await user.update(req.body);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'No se encontró a un usuario con ese ID' });
  await user.destroy();
  res.json({ mensaje: 'Se eliminó correctamente al usuario' });
};