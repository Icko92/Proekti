const express = require('express');
const actions = require('./actions');

var routes = express.Router();

routes.get('/garage', actions.getAllGarages);
routes.get('/garage/:id', actions.getSpecificGarage);


module.exports = routes;