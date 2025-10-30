const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { Service, Category, SubCategory } = require('../models')

const createService = async (data) => {
  const {name , categoryId , subCategoryId , price} = data
  if (!name || !categoryId || !subCategoryId || !price) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' some data messing')
  }
  const category = await Category.findById(categoryId)
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND,"category not found")
  }
  const subCategory = await SubCategory.findById(subCategoryId)
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND,"subCategory not found")
  }

  try {
    const service = await Service.create(data)
    return service
  } catch (error) {
    logger.error('Error creating service:', error)
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
}

const getAllService = async () =>{

  try {
    const service = await Service.find()
     .populate('categoryId', 'name')
    .populate('subCategoryId', 'name');
   
    return service
  } catch (error) {
    logger.error('Error fetching service:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
  
}

const getServiceById = async (id) => {
     if (!id) {
        throw new ApiError(httpStatus.NOT_FOUND , "Please provide service ID")
    }
  const service = await Service.findById(id)
    .populate('categoryId', 'name')
    .populate('subCategoryId', 'name');

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  return service;
};


const updateServiceById = async (id, data) => {
  if (!id) {
        throw new ApiError(httpStatus.NOT_FOUND , "Please provide service ID")
    }
  const service = await Service.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  return service;
};

const deleteService = async(id) =>{
  const service = await Service.findByIdAndDelete(id)
  if(!service){
    throw new ApiError(httpStatus.NOT_FOUND , "service not found ")

  }
  return service
}


module.exports ={
    createService,
    getAllService,
    getServiceById,
    updateServiceById,
    deleteService,
    
    
}