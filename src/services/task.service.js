const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')

const { Task , Order, User  } = require('../models')

const getAllTask = async (filter, option) => {
  const query = {}
  for (const key of Object.keys(filter)) {
    if (key === 'name' && filter[key] !== '') {
      query[key] = { $regex: filter[key], $options: 'i' }
    } else if (filter[key] !== '') {
      query[key] = filter[key]
    }
  }
  try {
    const tasks = await Order.paginate(query, {
    ...option ,
    populate : 'service'
  })
  return tasks
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST,"get Task error")
  }
}

const claimTask = async (orderId , taskerId) =>{
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND , "Task not found")
  }
  if (order.quantity == 0) {
    throw new ApiError(httpStatus.BAD_REQUEST ," NO remaining quantity for this task")
  }
  // check task ablaile acea ke na 
  if (order.status === 'completed' || order.status === 'cancelled') {throw new ApiError(httpStatus.FORBIDDEN , "Order is closed")
    
  }

  const taskClaimed = await Task.findOne({
    orderId  :order._id,
    compltedBy : taskerId
  })
  

  if (taskClaimed && (taskClaimed.status === "completed" || taskClaimed.status === "claimed")) {
    throw new ApiError(httpStatus.FORBIDDEN , "you already complted this taak")
  }

  const task = await Task.create({
    orderId: order._id,  
    taskerId: taskerId,    
    clientId: order.client,   
  status: "claimed"
  })

  return task

}

module.exports = {
  getAllTask,
  claimTask
}
