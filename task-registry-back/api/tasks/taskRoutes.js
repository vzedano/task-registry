'use strict';

module.exports = function (app) {
  var taskController = require('./taskController');

  app.route('/tasks')
    .get(taskController.list_all_tasks)
    .post(taskController.create_a_task);


  app.route('/tasks/:taskId')
    .get(taskController.read_a_task)
    .put(taskController.update_a_task)
    .delete(taskController.delete_a_task);
};