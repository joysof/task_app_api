const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')

const { Task , Order  } = require('../models')

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
const getTask = async (taskId) =>{
  const task = Task
}
module.exports = {
  getAllTask,
}
