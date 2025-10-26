const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const { subCategoryService } = require('../services')

const createSubCategory = catchAsync(async (req, res) => {
  
  const subCategory = await subCategoryService.createSubCategory(req.body)
  res.status(httpStatus.CREATED).json(
    response({
      message: 'SubCategory Created',
      status: 'OK',
      statusCode: httpStatus.CREATED,
      data: subCategory,
    })
  )
})



module.exports={
    createSubCategory
}