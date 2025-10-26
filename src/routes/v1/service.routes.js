const express = require("express")
const auth = require("../../middlewares/auth")
const {ServiceController } = require('../../controllers')
const serviceRoute = express.Router()

// addmin route 

serviceRoute.post('/' , auth('admin') , ServiceController.createService)
serviceRoute.get('/' , auth('admin' , 'client') , ServiceController.getAllService)
serviceRoute.put('/:id' , auth('admin') , ServiceController.updateService)

// client route 

serviceRoute.get('/:id' , auth('admin' ,'client') , ServiceController.getServiceById)

module.exports = serviceRoute