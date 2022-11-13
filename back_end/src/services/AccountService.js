const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Task = require('../models/Task');
const List = require('../models/List');


class AccountService {

  async login(req, res) {
    
    const { email, password } = req.body;

    let user = await Account.findOne({ email: email });
    if (!user)
      return res.status(400).send("User not found with email " + email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      user.password = undefined;
      return res.status(200).send({ user: user, token: token });
    } else return res.status(400).send("Password is wrong !");
  }

  async create(req, res) {
    const { email, password } = req.body;
    const account = new Account({
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    await account
      .save()
      .then(() => {
        return res.status(201).json(account);
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
          success: false,
        });
      });
  }
  async changePassword(req, res) {
    const { email, oldpassword, newpassword } = req.body;
    let user = await Account.findOne({ email: email });
    if (!user)
      return res.status(4000).send("User not found with email " + email);

    if (user && bcrypt.compareSync(oldpassword, user.password)) {
      user.password = bcrypt.hashSync(newpassword, 10);
      await user
        .save()
        .then(() => {
          return res.status(201).json(user);
        })
        .catch((err) => {
          return res.status(500).json({
            error: err,
            success: false,
          });
        });
    } else return res.status(400).send("Password is wrong !");
  }

  async sendMail() {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "giangnguyen010801@gmail.com",
          pass: "yduazmsaehwsubph",
        },
      });

      let mailOptions = {
        from: "giangnguyen010801@gmail.com",
        to: "19145369@student.hcmute.edu.vn",
        subject: "TODO_APP_REMIND",
        text: "",
      };
      const tasks = await Task.find().populate("list").exec();
      let todayTasks = [];
      for (const task of tasks) {
        if (task.remindAt != null) {
          if (!task.isCompleted && sameDay(task.remindAt, new Date())) {
            //Task for today then send email
            if (!task.list) continue;
            const temp = await List.findById(task.list._id).populate("account");
            mailOptions.to = temp.account.email;
            mailOptions.text = `You have a task to complete.\n Please visit task to check your tasks : http://localhost:4200/lists/${temp._id}`;
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            todayTasks.push(task);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
module.exports = new AccountService();
