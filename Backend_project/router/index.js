var express = require('express');
var userRouter = require('../users/routes');
var vehicleRouter = require('../vehicle/routes');
var garageRouter = require('../garage/routes');

const appRouter = express.Router();

appRouter.use(userRouter);
appRouter.use(vehicleRouter);
appRouter.use(garageRouter);

module.exports = appRouter;