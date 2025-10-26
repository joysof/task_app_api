const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { Service } = require('../models')

const createService = async (data) => {

  if (!data.name || !data.categoryId || !data.subCategoryId || !data.price) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' some data messing')
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


module.exports ={
    createService,
    getAllService,
    getServiceById,
    updateServiceById
    
}