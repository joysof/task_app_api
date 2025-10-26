const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const { ServiceService } = require('../services')

const createService = catchAsync(async (req, res) => {
  
  const service = await ServiceService.createService(req.body)
  res.status(httpStatus.CREATED).json(
    response({
      message: 'SubCategory Created',
      status: 'OK',
      statusCode: httpStatus.CREATED,
      data: service,
    })
  )
})

const getAllService = catchAsync(async(req,res) =>{
  const services = await ServiceService.getAllService()
  res.status(httpStatus.OK).json(
    response({
      message: 'SubCategories fetched successfully',
      status: 'OK',
      statusCode: httpStatus.OK,
      data: services,
    })
  );
})


module.exports={
    createService,
    getAllService
}