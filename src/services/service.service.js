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





module.exports ={
    createService,
    
}