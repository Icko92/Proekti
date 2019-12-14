const express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/vehicle_category', actions.getAllCategories);
routes.get('/vehicle', actions.getAllVehicles);
routes.get('/vehicle_category/:id', actions.getAllVehiclesForCategory);
routes.get('/vehicle/:id', actions.getSpecificVehicle);


module.exports = routes;