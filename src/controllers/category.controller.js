const httpStatus = require('http-status')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const { categoryService } = require('../services')

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body)

  res.status(httpStatus.CREATED).json(
    response({
      message: 'Category Created',
      status: 'OK',
      statusCode: httpStatus.CREATED,
      data: category,
    })
  )
})

const getAllCategories = catchAsync(async (req, res) => {
  
  const result = await categoryService.getAllCategory();
  res.status(httpStatus.OK).json(
    response({
      message: "All Categories",
      status: "OK",
      statusCode: httpStatus.OK,
      data: result,
    })
  );
});

const updateCategory = catchAsync (async (req,res) =>{

 const { id } = req.params;
  const category = await categoryService.updateCategoryById(id , req.body)
 res.status(httpStatus.OK).json(
    response({
      message: "Category Updated",
      status: "OK",
      statusCode: httpStatus.OK,
      data: category,
    })
  )

})

const deleteCategory = catchAsync (async (req,res) =>{

 const { id } = req.params;
  const category = await categoryService.deleteCategoryById(id )

 res.status(httpStatus.OK).json(
    response({
      message: "Category delete",
      status: "OK",
      statusCode: httpStatus.OK,
      data: category,
    })
  )

})


module.exports ={
    createCategory ,
    getAllCategories,
    updateCategory,
    deleteCategory
}