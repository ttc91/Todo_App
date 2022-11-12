const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
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

  async get(req, res) {
    // let id =  req.params.id;
    let user = await Account.find({});
    // console.log("=====" + id);
    // if (!user)
    //   return res.status(400).send("User not found id " + id);
    // else
    return res.status(200).send({ user: user });
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

  async sendMail(req, res) {
    const {second} = req.body;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "giangnguyen010801@gmail.com",
        pass: "yduazmsaehwsubph",
      },
    });

    var mailOptions = {
      from: "giangnguyen010801@gmail.com",
      to: "19145369@student.hcmute.edu.vn",
      subject: "You haven't completed the task yet",
      text: "Please visit task to check your tasks!",
    };


    let account = await Account.findById(req.params.accountId).exec(); 
    console.log(account);
    let lists = [];
    // let tasks = [] ;
    let task
    lists = await List.find({account : account.id}).exec();
    lists.forEach(function(list, index){
      task = Task.find({list : list.id}).exec();
    })
    console.log(task);
    // tasks.forEach(function(task, index){
    //   console.log(task);
    // })
  //   for(var i = 0; i < lists.length; i++) {
  //     let tasks = [];
  //     tasks = await Task.find({lists[i] : lists[i].id}).exec();
  // }
    // console.log(tasks)
    // cron.schedule(' * * * * * ', ()=>{ 
    //   console.log("send");

    //   // transporter.sendMail(mailOptions, function (error, info) {
    //   //   if (error) {
    //   //     console.log(error);
    //   //   } else {
    //   //     console.log("Email sent: " + info.response);
    //   //   }
    //   // });
    // })
    return res.status(200).send("successs");
  }
}

module.exports = new AccountService();
