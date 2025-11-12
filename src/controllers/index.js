const { model } = require('mongoose');

module.exports.authController = require('./auth.controller');
module.exports.userController = require('./user.controller');
module.exports.categoryController = require('./category.controller')
module.exports.subCategoryController = require("./subCategory.controller")
module.exports.ServiceController = require("./service.controller")
module.exports.OrderController = require('./order.controller')
module.exports.TaskController = require('./task.controller')