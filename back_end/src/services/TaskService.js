const Task = require("../models/Task");
const List = require("../models/List");
const multer = require("multer");
const path = require("path");

var storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

class TaskService {

  async import(req, res) {

    let upload = multer({ storage: storage }).single("file");
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
      isImportant: req.body.isImportant,
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
        new: true
      }
    );
    if (task) res.status(200).json(task);
    else res.status(500).json({ success: false, message: "error" });

  }

  async updateIsCompleted(req, res) {

    let task = await Task.findByIdAndUpdate(
      req.body._id,
      {
        isCompleted: req.body.isCompleted,
      },
      {
        new: true
      }
    );
    if (task) res.status(200).json(task);
    else res.status(500).json({ success: false, message: "error" });

  }

  async updateIsImportant(req, res) {

    let task = await Task.findByIdAndUpdate(
      req.body._id,
      {
        isImportant: req.body.isImportant,
      },
      {
        new: true
      }
    );
    if (task) res.status(200).json(task);
    else res.status(500).json({ success: false, message: "error" });

  }

  async updateIsToDay(req, res) {

    let task = await Task.findByIdAndUpdate(
      req.body._id,
      {
        isToday : req.body.isToday,
      },
      {
        new: true
      }
    );
    if (task) res.status(200).json(task);
    else res.status(500).json({ success: false, message: "error" });

  }

  async delete(req, res) {

    console.log(req);
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

    let task = await Task.findByIdAndUpdate(
      req.body._id,
      {
        note : req.body.note,
      },
      {
        new: true
      }
    );
    if (task) res.status(200).json(task);
    else res.status(500).json({ success: false, message: "error" });

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
