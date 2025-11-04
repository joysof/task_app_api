const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const { OrderService } = require('../services')

const createOrder = catchAsync(async (req, res) => {
  const cliendId = req.user._id
  const { serviceId, quantity ,endDate , url} = req.body
  const order = await OrderService.createOrder(cliendId, serviceId, quantity,endDate ,url)
  res.status(httpStatus.CREATED).json(
    response({
      message: 'order buy',
      status: 'OK',
      statusCode: httpStatus.CREATED,
      data: order,
    })
  )
})

const getAllOrders = catchAsync(async (req, res) => {
  const order = await OrderService.getAllOrders()
  res.status(httpStatus.OK).json(
    response({
      message: 'orders fetched successfully',
      status: 'OK',
      statusCode: httpStatus.OK,
      data :order
    })
  )
})
const getMyOrders = catchAsync(async (req, res) => {
    const cliendId = req.user._id
  const order = await OrderService.getMyOrders(cliendId)
  res.status(httpStatus.OK).json(
    response({
      message: 'oders fetched successfully',
      status: 'OK',
      statusCode: httpStatus.OK,
      data :order
    })
  )
})
const getMyOrderById = catchAsync(async (req, res) => {
    const cliendId = req.user._id
    const { id } = req.params;
  const order = await OrderService.getMyOrderById(id , cliendId)
  
  res.status(httpStatus.OK).json(
    response({
      message: 'oder fetched successfully',
      status: 'OK',
      statusCode: httpStatus.OK,
      data :order
    })
  )
})

module.exports = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getMyOrderById
}
