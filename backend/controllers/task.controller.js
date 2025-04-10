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
    const { title, description, color, state, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      color, 
      state,
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
    const { title, description, state, color, dueDate } = req.body;

    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.state === 'completed') {
      return res.status(400).json({
        error: 'Completed tasks cannot be updated',
      });
    }

    const currentState = task.state;

    if (state) {
      if (
        (state === 'in progress' && currentState !== 'pending') ||
        (currentState === 'in progress' && state === 'pending') ||
        (currentState === 'completed' && state !== 'completed') ||
        (state === 'completed' && currentState !== 'in progress')
      ) {
        return res.status(400).json({
          error: `Cannot change task state from ${currentState} to ${state}`,
        });
      }
      task.state = state;
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (color) task.color = color;
    if (dueDate) task.dueDate = dueDate;

    const result = await task.save();

    res.status(200).json({
      message: 'Task updated successfully',
      task: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (task.state !== 'completed') { 
      return res.status(400).json({ error: 'Only completed tasks can be deleted' });
    }

    await task.destroy();
    res.json({ message: 'Task successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};