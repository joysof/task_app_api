const express = require("express")
const auth = require('../../middlewares/auth')
const { OrderController } = require("../../controllers")
const orderRoute = express.Router()


orderRoute.post('/' , auth('client') , OrderController.createOrder)

module.exports =orderRoute