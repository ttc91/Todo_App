const Step = require("../models/Step");

class StepService {
  createStep(req, res) {
    const { taskId, stepName, priority } = req.body;
    if (!taskId || !stepName || !priority) {
      return res
        .status(400)
        .send({ success: false, message: "You must fill all the field." });
    }
    new Step({ task: taskId, stepName: stepName, priority: priority })
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

  async updateStep(req, res) {
    const { stepId, stepName, priority } = req.body;
    if (!stepId || !stepName || !priority) {
      console.log(stepId + stepName + priority);
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
      success: false,
      message: "Update step successfully !",
      step: step,
    });
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
      .status(400)
      .send({ success: false, message: "Delete step successfully !" });
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
      lstStep: lstStep,
    });
  }
}

module.exports = new StepService();
