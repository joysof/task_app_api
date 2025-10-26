const express = require("express")
const auth = require("../../middlewares/auth")
const {ServiceController } = require('../../controllers')
const serviceRoute = express.Router()


serviceRoute.post('/' , auth('admin') , ServiceController.createService)


module.exports = serviceRoute