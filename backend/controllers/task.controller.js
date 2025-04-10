const { Task } = require('../models');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id }, 
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, color, status, dueDate } = req.body;

    if (!title || !description || !color || !status || !dueDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const task = await Task.create({
      title,
      description,
      color, 
      status,
      dueDate,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    task ? res.json(task) : res.status(404).json({ error: 'Task not found' });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.update(req.body);

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id }, 
    });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (task.status !== 'completada') {
      return res.status(400).json({ error: 'Only completed tasks can be deleted' });
    }

    await task.destroy();
    res.json({ message: 'Task successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};