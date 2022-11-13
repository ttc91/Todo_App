const Task = require("../models/Task");
const List = require("../models/List");
const multer = require("multer");
const path = require("path");
const { findOneAndUpdate } = require("../models/Task");

var storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

class TaskService {
  async import(req, res) {
    let upload = multer({ storage: storage }).single("file");
    // const buffer = upload.
    upload(req, res, async function (err) {
      var buffer = req.file.buffer;
      console.log(buffer);

      let task = await Task.findById(req.body.id);
      task.file = buffer;
      Task.findOneAndUpdate(task._id, task)
        .then(() => {
          console.log("Ok");
        })
        .catch((err) => {
          console.log(err);
        });
      return res.send(
        `You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`
      );
    });
  }
  async create(req, res) {
    let list = await List.findById(req.body.listId).exec();

    let task = await Task({
      taskName: req.body.taskName,
      note: req.body.taskNote,
      deadline: req.body.deadline,
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

  update(req, res) {
    let task = Task.findByIdAndUpdate(
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
      .then((task) => {
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

  async updateNote(req, res) {
    let task = await Task.findById(req.body.taskId).exec();
    if (!task)
      return res
        .status(400)
        .json({ success: false, message: "Task not found !" });
    task.note = req.body.note;
    task = await Task.findOneAndUpdate(task._id, task, { new: true });
    if (!task)
      return res
        .status(400)
        .json({ success: false, message: "Unable to update task Note !" });
    res.status(200).json(task);
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
