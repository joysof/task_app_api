const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { Service ,Order, User } = require('../models')
const { http } = require('winston')





const createOrder = async (cliendId , serviceId , quantity) => {
    if(!serviceId){
        throw new ApiError(httpStatus.NOT_FOUND , "service not found")
    }
  if (!cliendId || ! quantity) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' some data messing tring agin')
  }
  console.log("service model" , Service)

  try {
      const service = await Service.findById(serviceId)
    if (!service) {
      throw new ApiError(httpStatus.NOT_FOUND, "Service not found")
    }
      const totalPrice = claculatePrice(service.basePrice , quantity)
      const order = await Order.create({
        client : cliendId,
        service : service._id,
        quantity,
        totalPrice
      })
      return order
  } catch (error) {
    logger.error('Error creating order:', error)
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
  
}
const claculatePrice = (basePrice , quantity) =>{
  return Number((basePrice * quantity))
}

const getAllOrders = async () =>{

   try {
    const order = await Order.find()
      .populate('service', 'name price')
      .populate('client' ,'name email')
    return order
  } catch (error) {
    logger.error('Error fetching order:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}

const getMyOrders= async (cliendId) =>{
     try {
    const orders = await Order.find({client : cliendId})
      .populate('service', 'name price')
    return orders
  } catch (error) {
    logger.error('Error fetching order:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}
const getMyOrderById = async (orderId , cliendId) =>{


     try {
    const order = await Order.findOne({_id : orderId , client : cliendId})
    if(!order){
      throw new ApiError(httpStatus.NOT_FOUND,"order not found")
    }
    
      order.populate('service', 'name price')
    return order
  } catch (error) {
    logger.error('Error fetching order:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}







module.exports ={
    
    createOrder,
    getAllOrders,
    getMyOrders,
    getMyOrderById
    
}