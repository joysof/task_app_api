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
const deleteSubCategory = async (id) =>{
  if (!id) {
        throw new ApiError(httpStatus.NOT_FOUND , "Please provide category ID")
    }
  const subCategory = await SubCategory.findByIdAndDelete(id)
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND , "subCategory not found")
  }

  return subCategory
}



module.exports ={
    createSubCategory,
    getAllSubCategory,
    deleteSubCategory
}