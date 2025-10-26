const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const response = require('../config/response')
const { ServiceService } = require('../services')

const createService = catchAsync(async (req, res) => {
  
  const service = await ServiceService.createService(req.body)
  res.status(httpStatus.CREATED).json(
    response({
      message: 'SubCategory Created',
      status: 'OK',
      statusCode: httpStatus.CREATED,
      data: service,
    })
  )
})

const getAllService = catchAsync(async(req,res) =>{
  const services = await ServiceService.getAllService()
  res.status(httpStatus.OK).json(
    response({
      message: 'SubCategories fetched successfully',
      status: 'OK',
      statusCode: httpStatus.OK,
      data: services,
    })
  );
})

const getServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const service = await ServiceService.getServiceById(id);

  res.status(httpStatus.OK).json(
    response({
      message: 'Service Fetched',
      status: 'OK',
      statusCode: httpStatus.OK,
      data: service,
    })
  );
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updated = await ServiceService.updateServiceById(id, req.body);

  res.status(httpStatus.OK).json(
    response({
      message: 'Service Updated',
      status: 'OK',
      statusCode: httpStatus.OK,
      data: updated,
    })
  );
});
const deleteService = catchAsync (async (req,res) =>{
  const {id} = req.params
  const service = await ServiceService.deleteService(id)
   res.status(httpStatus.OK).json(
    response({
      message: 'Service delete',
      status: 'OK',
      statusCode: httpStatus.OK,
      data: service,
    })
  );
})


module.exports={
    createService,
    getAllService,
    getServiceById,
    updateService,
    deleteService
}