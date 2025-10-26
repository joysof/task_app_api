const express = require("express")
const auth = require("../../middlewares/auth")
const { categoryController } = require("../../controllers")


const categoryRoute = express.Router()

categoryRoute.post('/' , auth('admin') ,categoryController.createCategory)
categoryRoute.get('/' , auth('admin') , categoryController.getAllCategories)
categoryRoute.put('/:id' , auth('admin') , categoryController.updateCategory)
categoryRoute.delete('/:id' , auth('admin') , categoryController.deleteCategory)






module.exports = categoryRoute