const express = require("express")
const auth = require("../../middlewares/auth")
const { subCategoryController } = require("../../controllers")
const subCategoryRoute = express.Router()


subCategoryRoute.post('/', auth('admin') , subCategoryController.createSubCategory)
subCategoryRoute.get('/', auth('admin') , subCategoryController.getAllSubCategory)


module.exports = subCategoryRoute