const express = require("express")
const auth = require('../../middlewares/auth')
const { OrderController } = require("../../controllers")
const orderRoute = express.Router()


orderRoute.post('/' , auth('client') , OrderController.createOrder)
orderRoute.get('/' , auth('client') , OrderController.getAllOrders)

module.exports =orderRoute