const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { SubCategory, Category } = require('../models')

const createSubCategory = async (data) => {
  const {name , categoryId} = data
  if (!name || !categoryId) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' subCategory Name is required')
  }
  const category = await Category.findById(categoryId)
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND , "category not found")
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
const updateSubCategory = async (id ,data) =>{
  if (!id) {
        throw new ApiError(httpStatus.NOT_FOUND , "Please provide category ID")
    }

  const updateSubCategory = await SubCategory.findByIdAndUpdate(id , data ,{new :true ,runValidators: true })
  if (!updateSubCategory) {
    throw new ApiError(httpStatus.NOT_FOUND , "subCategory not found")
  }

  return updateSubCategory
}



module.exports ={
    createSubCategory,
    getAllSubCategory,
    deleteSubCategory,
    updateSubCategory
}