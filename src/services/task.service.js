const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')

const { Task , Order, User  } = require('../models')

const getAllTask = async (filter, option , taskerId) => {
  const query = {}
  for (const key of Object.keys(filter)) {
    if (key === 'name' && filter[key] !== '') {
      query[key] = { $regex: filter[key], $options: 'i' }
    } else if (filter[key] !== '') {
      query[key] = filter[key]
    }
  }
  try {
    query.quantity = { $gt: 0 }
  //   const taskClaimed = await Task.findOne({
  //   compltedBy : taskerId
  // })
  

  // if (taskClaimed && (taskClaimed.status === "completed" || taskClaimed.status === "rejected")) {
  //   throw new ApiError(httpStatus.FORBIDDEN , "you already complted this taak")
  // }
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
  

  if (taskClaimed && (taskClaimed.status === "completed" || taskClaimed.status === "rejected")) {
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

const submitTask = async (taskId , taskerId , screenshotUrl) =>{
  const task = await Task.findById(taskId)
  console.log(task ,"task")
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND , " Task not found")

  }
  if (task.taskerId.toString() !== taskerId.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN , "You are not authorized to submit this task")
  }
  if (task.status === 'rejected' || task.status === 'completed') {
    throw new ApiError(httpStatus.BAD_REQUEST ,"Task already submited")
  }
  if (!screenshotUrl) {
    throw new ApiError(httpStatus.BAD_REQUEST ,"Screenshot is required")
  }
  task.screenshot = screenshotUrl
  task.status = "submitted"
  await task.save()
  const order = await Order.findById(task.orderId)
  if (order) {
    if (order.quantity > 0) {
      order.quantity -= 1
      await order.save()
    }
  }
  return task
}

const getMyAllTask = async (filter,option ,taskerId) =>{

  if (!taskerId) {
    throw new ApiError(httpStatus.NOT_FOUND , "you ar not authorized login in again")
  }
  const query = {}
  for (const key of Object.keys(filter)) {
    if (key === 'name' && filter[key] !== '') {
      query[key] = { $regex: filter[key], $options: 'i' }
    } else if (filter[key] !== '') {
      query[key] = filter[key]
    }
  }
  try {
    const tasks = await Task.paginate(query , {
      ...option ,
      populate : 'order'
    })
    return tasks
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST ,"get my Task Error")
  }
}
module.exports = {
  getAllTask,
  claimTask,
  submitTask,
  getMyAllTask
}
