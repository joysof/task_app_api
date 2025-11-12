const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const { TaskServics } = require('../services')
const pick = require('../utils/pick')

const getAllTask = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name'])
  const taskerId = req.user
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const result = await TaskServics.getAllTask(filter, options , taskerId)
  res.status(httpStatus.OK).json(
    response({
      message: 'Tasks fetched successfully',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: result,
    })
  )
})

const claimTask = catchAsync(async (req, res) => {
  const orderId = req.params.id
  const taskerId = req.user._id
  const result = await TaskServics.claimTask(orderId, taskerId)
  res.status(httpStatus.OK).json(
    response({
      message: 'Task cliam successfully ',
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: result,
    })
  )
})
const submitTask = catchAsync (async (req,res) =>{
  const {id : taskId} = req.params
  const taskerId = req.user.id
  console.log("request user Id" , taskerId)
  const {screenshotUrl}  = req.body
  const result = await TaskServics.submitTask(taskId , taskerId ,screenshotUrl)
  res.status(httpStatus.OK).json(
    response({
      message : "Task submitted successfully",
      status: 'Ok',
      statusCode: httpStatus.OK,
      data: result,
    })
  )
})
module.exports = {
  getAllTask,
  claimTask,
  submitTask
}
