const express = require("express");
const config = require("../../config/config");
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");
const docsRoute = require("./docs.routes");
const categoryRoute = require("./category.routes");
const subCategoryRoute = require("./subCategory.routes");
const serviceRoute = require("./service.routes");
const orderRoute = require("./order.routes");


const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/subCategory",
    route:subCategoryRoute,
  },
  {
    path: "/service",
    route:serviceRoute,
  },
  {
    path: "/order",
    route:orderRoute,
  },
 
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
