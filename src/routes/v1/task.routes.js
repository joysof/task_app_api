const express = require("express")
const auth = require("../../middlewares/auth")
const { TaskController } = require("../../controllers")

const taskRoutes = express.Router()

taskRoutes.get('/' , auth('tasker'), TaskController.getAllTask)
taskRoutes.post('/:id/claim' , auth('tasker'), TaskController.claimTask)

module.exports = taskRoutes