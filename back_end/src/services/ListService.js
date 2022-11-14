const Task = require("../models/Task");
const List = require("../models/List");
const Account = require("../models/Account");
const { find } = require("../models/Account");
const Step = require("../models/Step");

class ListService {
  async create(req, res) {
    let account = await Account.findById(req.userId).exec();
    let list = await List({
      listName: req.body.listName,
      account: account._id,
    });

    await list
      .save()
      .then(() => {
        res.status(201).json(list);
      })
      .catch((error) => {
        res.status(500).json({
          message: error,
          success: false,
        });
      });
  }

  async update(req, res) {
    let list = List.findByIdAndUpdate(
      req.body.id,
      {
        listName: req.body.listName,
      },
      {
        new: true,
      }
    )
      .then(() => {
        res.status(200).json(list);
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          success: false,
        });
      });
  }

  async delete(req, res) {
    const tasks = await Task.find({ list: req.params.id }).select("_id");
    for (const task of tasks) {
      await Step.deleteMany({ task: task });
    }
    Task.deleteMany({ list: req.params.id })
      .then(() => {
        List.findByIdAndDelete(req.params.id)
          .then(async () => {
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
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          success: false,
        });
      });
  }

  async getOne(req, res) {
    let list = await List.findById(req.params.id).exec();

    if (list != null) {
      res.status(200).json({ list });
    } else {
      res.status(500).json({
        message: "Cannot get data !",
      });
    }
  }

  async getAll(req, res) {
    let account = await Account.findById(req.userId).exec();
    let lists = [];
    lists = await List.find({ account: account.id }).exec();

    if (lists != null) {
      res.status(200).json({ lists });
    } else {
      res.status(400).json({
        message: "Cannot get list data !",
      });
    }
  }
}

module.exports = new ListService();
