const httpStatus = require("http-status")
const ApiError = require("../utils/ApiError")
const logger = require('../config/logger')
const {Category} = require("../models")

const createCategory = async(data) =>{
    if (!data) {
        throw new ApiError(httpStatus.BAD_REQUEST ,"Name is required")
    }
    try {
        const category = await Category.create(data)
        return category
    } catch (error) {
        logger.error("Error creating category : " ,error)
        throw new ApiError(httpStatus.BAD_REQUEST , error.message)
    }
}
const getAllCategory = async (filter = {}) =>{
    const categories = await Category.find(filter).sort('-createdAt')
    if (!categories.length) {
        throw new ApiError(httpStatus.NOT_FOUND , "No categories found")
    }
    return categories;
}
const updateCategoryById = async (id , bodyData) =>{
    if (!id) {
        throw new ApiError(httpStatus.NOT_FOUND , "Please provide category ID")
    }
    const category = await Category.findById(id)
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND , "category not found")
    }
    Object.assign(category , bodyData)
    await category.save()
    return category
}
const deleteCategoryById = async (id) =>{
    console.log("type of id" , typeof(id))
    if (!id) {
        throw new ApiError(httpStatus.NOT_FOUND , "Please provide category ID")
    }
    const category = await Category.findByIdAndDelete(id)
    console.log("category" , category)
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND , "category not found")
    }
    return category
}

module.exports ={
    createCategory ,
    getAllCategory,
    updateCategoryById ,
    deleteCategoryById
}