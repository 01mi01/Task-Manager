const { Task } = require('../models');

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

exports.getTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  task
    ? res.json(task)
    : res.status(404).json({ error: 'No se encontró una tarea con ese ID' });
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'No se encontró una tarea con ese ID' });
  await task.update(req.body);
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'No se encontró una tarea con ese ID' });
  await task.destroy();
  res.json({ mensaje: 'Se eliminó correctamente la tarea' });
};
