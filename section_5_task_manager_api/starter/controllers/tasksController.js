const TaskModel = require('../models/TaskModel');

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await TaskModel.find({});

    res.status(200).json({ allTasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const createTask = async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findOne({ _id: taskId });

    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${taskId}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${taskId}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findOneAndDelete({ _id: taskId });

    if (!task) {
      return res.status(404).json({ msg: `no task with id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
