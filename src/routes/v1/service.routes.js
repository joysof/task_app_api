const express = require("express")
const auth = require("../../middlewares/auth")
const {ServiceController } = require('../../controllers')
const serviceRoute = express.Router()

// addmin route 

serviceRoute.post('/' , auth('admin') , ServiceController.createService)
serviceRoute.put('/:id' , auth('admin') , ServiceController.updateService)
serviceRoute.delete('/:id' , auth('admin') , ServiceController.deleteService)

// client route  and admin route 

serviceRoute.get('/:id' , auth('admin' ,'client') , ServiceController.getServiceById)
serviceRoute.get('/' , auth('admin' , 'client') , ServiceController.getAllService)

module.exports = serviceRoute