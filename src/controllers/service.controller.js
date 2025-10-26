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


module.exports={
    createService,
}