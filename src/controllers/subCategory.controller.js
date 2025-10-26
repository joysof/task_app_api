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

const getAllSubCategory = catchAsync(async(req,res) =>{
  const subcategories = await subCategoryService.getAllSubCategory()
  res.status(httpStatus.OK).json(
    response({
      message: 'SubCategories fetched successfully',
      status: 'OK',
      statusCode: httpStatus.OK,
      data: subcategories,
    })
  );
})
const deleteSubCategory = catchAsync(async(req,res) =>{
 const { id } = req.params;
 const subcategory = await subCategoryService.deleteSubCategory(id)
  res.status(httpStatus.OK).json(
    response({
      message: 'SubCategory deleted successfully',
      status: 'OK',
      statusCode: httpStatus.OK,
      data: subcategory,
    })
  );
})

module.exports={
    createSubCategory,
    getAllSubCategory,
    deleteSubCategory
}