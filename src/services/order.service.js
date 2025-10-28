const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { Service ,Order } = require('../models')



const claculatePrice = (basePrice , quantity) =>{
  return Number((basePrice * quantity))
}
const createOrder = async (cliendId , serviceId , quantity) => {
    if(!serviceId){
        throw new ApiError(httpStatus.NOT_FOUND , "service not found")
    }
  if (!cliendId || ! quantity) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' some data messing tring agin')
  }

  try {
      const totalPrice = claculatePrice(Service.basePrice , quantity)
      const order = await Order.create({
        client : cliendId,
        service : Service._id,
        quantity,
        totalPrice
      })
      return order
  } catch (error) {
    logger.error('Error creating order:', error)
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
  
}








module.exports ={
    
    createOrder
    
}