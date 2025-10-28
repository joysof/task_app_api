const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const { OrderService } = require('../services')

const createOrder = catchAsync(async (req, res) => {
  
    const cliendId = req.user._id
    const {serviceId , quantity} = req.body
  const order = await OrderService.createOrder(cliendId , serviceId , quantity)
  res.status(httpStatus.CREATED).json(
    response({
      message: 'order buy',
      status: 'OK',
      statusCode: httpStatus.CREATED,
      data: order,
    })
  )
})






module.exports={
    createOrder
}