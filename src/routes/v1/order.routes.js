const express = require("express")
const auth = require('../../middlewares/auth')
const { OrderController } = require("../../controllers")
const orderRoute = express.Router()

// client route 


orderRoute.post('/' , auth('client') , OrderController.createOrder)
orderRoute.get('/' , auth('client') , OrderController.getMyOrders)



// admin routes anc employ route 
orderRoute.get('/all' , auth('admin' , 'empoly') , OrderController.getAllOrders)



// common route 

orderRoute.get('/:id' , auth('client' ,'admin') , OrderController.getMyOrderById)



module.exports =orderRoute