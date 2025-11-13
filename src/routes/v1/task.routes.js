const express = require("express")
const auth = require("../../middlewares/auth")
const { TaskController } = require("../../controllers")

const taskRoutes = express.Router()

taskRoutes.get('/' , auth('tasker'), TaskController.getAllTask)
taskRoutes.post('/:id/claim' , auth('tasker'), TaskController.claimTask)
taskRoutes.post('/:id' , auth('tasker'), TaskController.submitTask)
taskRoutes.get('/myTask' , auth('tasker'), TaskController.getMyAllTask)
taskRoutes.get('/myTask/:id' , auth('tasker'), TaskController.getMyTask)

module.exports = taskRoutes