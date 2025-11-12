const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { Service, Order, User } = require('../models')
const { http } = require('winston')

const createOrder = async (cliendId, serviceId, quantity, endDate, url) => {
  if (!serviceId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'service not found')
  }
  if (!cliendId || !quantity || !endDate || !url) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' some data messing tring agin')
  }

  try {
    const service = await Service.findById(serviceId)
    if (!service) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Service not found')
    }
    const totalPrice = claculatePrice(service.basePrice, quantity)
    const order = await Order.create({
      client: cliendId,
      service: service._id,
      quantity,
      totalPrice,
      endDate,
      url,
    })
    return order
  } catch (error) {
    logger.error('Error creating order:', error)
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
}
const claculatePrice = (basePrice, quantity) => {
  return Number(basePrice * quantity)
}

const getAllOrders = async (filter , option) => {
  const query = {}
  for (const key of Object.keys(filter)) {
      if (
        (key === "name") &&
        filter[key] !== ""
      ) {
        query[key] = { $regex: filter[key], $options: "i" };
      } else if (filter[key] !== "") {
        query[key] = filter[key];
      }
    }
  try {
    const order = await Order.paginate(query ,{
      ...option,
      populate : ('service')
  
    })
    return order
  } catch (error) {
    logger.error('Error fetching order:', error)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
  }
}

const getMyOrders = async (cliendId , filter , option) => {
const query ={client : cliendId}
  for (const key of Object.keys(filter)) {
      if (
        (key === "name") &&
        filter[key] !== ""
      ) {
        query[key] = { $regex: filter[key], $options: "i" };
      } else if (filter[key] !== "") {
        query[key] = filter[key];
      }
    }
  try {
    const orders = await Order.paginate(query ,{
      ...option,
      populate : ('service')
    })
    return orders
  } catch (error) {
    logger.error('Error fetching order:', error)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
  }
}
const getMyOrderById = async (id) => {
  if (!id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'oder not found')
  }
  try {
    const order = await Order.findOne({ _id: id }).populate(
      'service',
      'name price'
    )
    return order
  } catch (error) {
    logger.error('Error fetching order:', error)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
  }
}
module.exports = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getMyOrderById,
}
