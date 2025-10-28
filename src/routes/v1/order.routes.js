const express = require("express")
const auth = require('../../middlewares/auth')
const { OrderController } = require("../../controllers")
const orderRoute = express.Router()

// client route 


orderRoute.post('/' , auth('client') , OrderController.createOrder)
orderRoute.get('/orders' , auth('client') , OrderController.getMyOrders)

// admin routes 
orderRoute.get('/' , auth('admin') , OrderController.getAllOrders)
module.exports =orderRoute