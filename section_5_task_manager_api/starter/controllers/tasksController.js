const TaskModel = require('../models/TaskModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/CustomError');

const getAllTasks = asyncWrapper(async (req, res) => {
  const allTasks = await TaskModel.find({});

  res.status(200).json({ allTasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await TaskModel.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await TaskModel.findOne({ _id: taskId });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await TaskModel.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await TaskModel.findOneAndDelete({ _id: taskId });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
