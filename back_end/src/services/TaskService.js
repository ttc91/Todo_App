const Task = require("../models/Task");
const List = require("../models/List");

class TaskService {
  async create(req, res) {
    let list = await List.findById(req.body.listId).exec();

    let task = await Task({
      taskName: req.body.taskName,
      list: list._id,
    });

    await task
      .save()
      .then(() => {
        res.status(201).json(task);
      })
      .catch((error) => {
        res.status(500).json({
          message: error,
          success: false,
        });
      });
  }

  async update(req, res) {
    let task = await Task.findByIdAndUpdate(
      req.body.id,
      {
        taskName: req.body.taskName,
        note: req.body.note,
        isCompleted: req.body.isCompleted,
        isImportant: req.body.isImportant,
        isToday: req.body.isToday,
        deadline: req.body.deadline,
        remindAt: req.body.remindAt,
        file: req.body.file,
      },
      {
        new: true,
        upsert: true,
        rawResult: true,
      }
    )
      .then(() => {
        res.status(200).json(task);
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          success: false,
        });
      });
  }

  async delete(req, res) {
    await Task.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({
          message: "Delete complete !!!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          success: false,
        });
      });
  }

  async getOne(req, res) {
    let task = await Task.findById(req.params.id).exec();

    if (task != null) {
      res.status(200).json({ task });
    } else {
      res.status(500).json({
        message: "Cannot get data !",
      });
    }
  }

  async getAll(req, res) {
    let list = await List.findById(req.params.listId).exec();
    if (!list)
      return res
        .status(400)
        .send({ success: false, message: "List not found !" });
    let tasks = [];
    tasks = await Task.find({ list: list._id }).exec();

    if (tasks != null) {
      res.status(200).json({ tasks });
    } else {
      res.status(500).json({
        message: "Cannot get list data !",
      });
    }
  }
}

module.exports = new TaskService();
