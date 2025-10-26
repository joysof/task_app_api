const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { SubCategory } = require('../models')

const createSubCategory = async (data) => {
  if (!data.name || !data.categoryId) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' subCategory Name is required')
  }
  try {
    const subCategory = await SubCategory.create(data)
    return subCategory
  } catch (error) {
    logger.error('Error creating subcategory:', error)
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
}

const getAllSubCategory= async () =>{
  try {
    const subCategory = await SubCategory.find().populate('categoryId' , 'name')
    return subCategory
  } catch (error) {
    logger.error('Error fetching subcategories:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
  
}



module.exports ={
    createSubCategory,
    getAllSubCategory
}