const Step = require("../models/Step");

class StepService {
  async createStep(req, res) {
    const { taskId, stepName } = req.body;
    if (!taskId || !stepName) {
      return res
        .status(400)
        .send({ success: false, message: "You must fill all the field." });
    }
    const options = {
      limit: 1,
      sort: { priority: "desc" },
    };

    Step.paginate({ task: taskId }, options, function (err, result) {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        const latestStep = result.docs[0];
        const priority = latestStep ? latestStep.priority + 1 : 1;

        new Step({
          task: taskId,
          stepName: stepName,
          priority: priority,
          isCompleted: false,
        })
          .save()
          .then((newStep) => {
            return res.status(200).send({
              success: true,
              message: "Add step suceessfully !",
              step: newStep,
            });
          })
          .catch((err) => {
            return res.status(400).send({ success: false, message: err });
          });
      }
    });
  }

  async updateStep(req, res) {
    const { stepId, stepName, priority } = req.body;
    if (!stepId || !stepName || !priority) {
      return res
        .status(400)
        .send({ success: false, message: "You must fill all the field." });
    }
    let step = await Step.findById(stepId);
    if (!step)
      return res
        .status(400)
        .send({ success: false, message: "Step not found !" });
    step.stepName = stepName;
    step.priority = priority;

    step = await Step.findOneAndUpdate({ _id: stepId }, step, { new: true });

    if (!step)
      return res
        .status(400)
        .send({ success: false, message: "Error when adding new step !" });
    return res.status(200).send({
      success: true,
      message: "Update step successfully !",
      step: step,
    });
  }

  async updateAllStep(req, res) {
    const steps = req.body.steps;
    if (!steps || steps.length == 0) {
      return res
        .status(400)
        .send({ success: false, message: "You must fill all the field." });
    }
    try {
      for (const step of steps) {
        await Step.updateOne(
          { _id: step._id },
          {
            $set: {
              priority: step.priority,
            },
          }
        );
      }
      return res.status(200).send({
        success: true,
        message: "Update step successfully !",
      });
    } catch (error) {
      return res.status(500).send("Error");
    }
  }

  async deleteStep(req, res) {
    const stepId = req.params.stepId;
    if (!stepId) {
      return res
        .status(400)
        .send({ success: false, message: "Step Id not found !" });
    }
    await Step.findByIdAndDelete(stepId);

    return res
      .status(200)
      .send({ success: true, message: "Delete step successfully !" });
  }

  async getStepsOfTaks(req, res) {
    const taskId = req.params.taskId;
    if (!taskId) {
      return res
        .status(400)
        .send({ success: false, message: "Task Id not found" });
    }
    const lstStep = await Step.find({ task: taskId });
    if (lstStep.length == 0)
      return res.send({
        success: false,
        message: "No Step found !",
        lstStep: lstStep,
      });
    return res.send({
      success: true,
      message: "Sucess",
      lstStep: lstStep.sort((a, b) => {
        return a.priority - b.priority;
      }),
    });
  }

  async reverseCompleteStep(req, res) {
    let step = await Step.findById(req.params.id);
    if (!step)
      return res
        .status(400)
        .send({ success: false, message: "Step not found !" });
    step.isCompleted = !step.isCompleted;
    step = await Step.findByIdAndUpdate(step._id, step, { new: true });
    if (!step)
      return res
        .status(400)
        .send({ success: fasle, message: "Error occur when updating step." });
    return res
      .status(200)
      .send({ success: true, message: "Success", step: step });
  }
}

module.exports = new StepService();
