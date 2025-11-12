const httpStatus = require("http-status")
const ApiError = require("../utils/ApiError")
const catchAsync = require("../utils/catchAsync")
const response = require("../config/response")
const {TaskServics} = require("../services") 
const pick = require("../utils/pick")

const getAllTask = catchAsync(async (req,res) =>{
    const filter = pick(req.query , ["name"])
    const options = pick(req.query , ["sortBy", "limit", "page"])
    const result = await TaskServics.getAllTask(filter , options)
    res.status(httpStatus.OK).json(
        response({
            message : "Tasks fetched successfully",
            status : 'Ok',
            statusCode : httpStatus.OK,
            data : result
        })
    )
})

module.exports = {
    getAllTask
}