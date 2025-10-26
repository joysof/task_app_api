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

module.exports ={
    createCategory ,
    getAllCategory
}