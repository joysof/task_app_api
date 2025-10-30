const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const logger = require('../config/logger')
const { Service, Category, SubCategory } = require('../models')

const createService = async (data) => {
  const {name , categoryId , subCategoryId , price} = data
  if (!name || !categoryId || !subCategoryId || !price) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' some data messing')
  }
  const category = await Category.findById(categoryId)
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND,"category not found")
  }
  const subCategory = await SubCategory.findById(subCategoryId)
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND,"subCategory not found")
  }

  try {
    const service = await Service.create(data)
    return service
  } catch (error) {
    logger.error('Error creating service:', error)
    throw new ApiError(httpStatus.BAD_REQUEST, error.message)
  }
}

const getAllService = async (filter , option) =>{

  const query = {}
 for (const key of Object.keys(filter)) {
      if (
        (key === "name") &&
        filter[key] !== ""
      ) {
        query[key] = { $regex: filter[key], $options: "i" };
      } else if (filter[key] !== "") {
        query[key] = filter[key];
      }
    }

  try {
     const populate = "subCategoryId categoryId";
    const services = await Service.paginate(query , {
      ...option,
     populate
    })
       await Service.populate(services.results, {
      path: "subCategoryId",
      select: "name categoryId",
      populate: { path: "categoryId", model: "Category", select: "name" },
    });
    const grouped = {};
    services.results.forEach(service => {
      const subCat = service.subCategoryId;
      const category = subCat?.categoryId;

      if (!category || !subCat) return;

      if (!grouped[category.id]) {
        grouped[category.id] = {
          category: {
            id: category.id.toString(),
            name: category.name,
          },
          subCategories: {},
        };
      }

      if (!grouped[category.id].subCategories[subCat.id]) {
        grouped[category.id].subCategories[subCat.id] = {
          id: subCat.id,
          name: subCat.name,
          services: [],
        };
      }

      grouped[category.id].subCategories[subCat.id].services.push({
        id: service.id,
        name: service.name,
        basePrice: service.basePrice,
        baseQuantity: service.baseQuantity,
      });
    });

    
    const formatted = Object.values(grouped).map(cat => ({
      category: cat.category,
      subCategories: Object.values(cat.subCategories),
    }));
   
    return formatted
  } catch (error) {
    logger.error('Error fetching service:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
  
}

const getServiceById = async (id) => {
     if (!id) {
        throw new ApiError(httpStatus.NOT_FOUND , "Please provide service ID")
    }
  const service = await Service.findById(id)
    .populate('categoryId', 'name')
    .populate('subCategoryId', 'name');

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  return service;
};


const updateServiceById = async (id, data) => {
  if (!id) {
        throw new ApiError(httpStatus.NOT_FOUND , "Please provide service ID")
    }
  const service = await Service.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }

  return service;
};

const deleteService = async(id) =>{
  const service = await Service.findByIdAndDelete(id)
  if(!service){
    throw new ApiError(httpStatus.NOT_FOUND , "service not found ")

  }
  return service
}


module.exports ={
    createService,
    getAllService,
    getServiceById,
    updateServiceById,
    deleteService,
    
    
}