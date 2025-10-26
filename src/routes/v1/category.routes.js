const express = require("express")
const auth = require("../../middlewares/auth")
const { categoryController } = require("../../controllers")

const categoryRoute = express.Router()

categoryRoute.post('/' , auth() ,categoryController.createCategory)







module.exports = categoryRoute