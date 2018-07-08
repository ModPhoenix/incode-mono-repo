const Task = require('../models/task.model');

module.exports = {
  getAll: (req, res) => {
    Task.find()
      .then(tasks => {
        res.send(tasks);
      }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks."
      });
    });
  },
  create: (req, res, next) => {
    let task = new Task(
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      }
    );
    task.save(function (err) {
      if (err) {
        return next(err);
      }
      res.send(task)
    })
  },
  getById: (req, res, next) => {
    Task.findById(req.params.id, function (err, task) {
      if (!task) return res.status(404).send("No task found.");
      if (err) return res.status(500).send("There was a problem finding the task.");
      res.status(200).send(task);
    })
  },
  update: (req, res) => {
    if(!req.body) {
      return res.status(400).send({
        message: "Task status can not be empty"
      });
    }

    Task.findByIdAndUpdate(req.params.id,
      {$set: req.body}, {new: true})
      .then(task => {
        if(!task) {
          return res.status(404).send({
            message: "Task not found with id " + req.params.id
          });
        }
        res.send(task);
      }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Task not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating task with id " + req.params.id
      });
    });
  },
  deleteTask: (req, res, next) => {
    Task.findByIdAndRemove(req.params.id, function (err) {
      if (err) return next(err);
      res.send('Deleted successfully!');
    })
  }
};
