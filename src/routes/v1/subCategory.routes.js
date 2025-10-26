const express = require("express")
const auth = require("../../middlewares/auth")
const { subCategoryController } = require("../../controllers")
const subCategoryRoute = express.Router()


subCategoryRoute.post('/', auth('admin') , subCategoryController.createSubCategory)
subCategoryRoute.get('/', auth('admin') , subCategoryController.getAllSubCategory)
subCategoryRoute.delete('/:id', auth('admin') , subCategoryController.deleteSubCategory)
subCategoryRoute.put('/:id', auth('admin') , subCategoryController.updateSubCategory)


module.exports = subCategoryRoute