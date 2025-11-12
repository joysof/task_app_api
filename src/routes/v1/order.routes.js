const express = require("express")
const auth = require('../../middlewares/auth')
const { OrderController } = require("../../controllers")
const orderRoute = express.Router()

// client route 


orderRoute.post('/' , auth('client') , OrderController.createOrder)
orderRoute.get('/' , auth('client') , OrderController.getMyOrders)



// admin routes and empoly 
orderRoute.get('/all' , auth('admin') , OrderController.getAllOrders)



// common route 

orderRoute.get('/:id' , auth('common') , OrderController.getMyOrderById)



module.exports =orderRoute