const express = require('express');
const actions = require('./actions');
const middleware = require('../middlewares/common');

var routes = express.Router();

routes.get('/users', middleware.verifyToken, middleware.isAdmin, actions.getAllUsers);
routes.get('/users/:id',middleware.verifyToken, actions.getSpecificUser);
routes.post('/register', actions.registerUser);
routes.put('/users/:id', actions.updateUser);
routes.patch('/users/:id', actions.deleteUser);
routes.post('/users/:id/payment', actions.userAddPayment);
routes.put('/users/:id/payment', actions.userChangePayment);
routes.put('/users/:id/payment/balance', actions.userUpdateBalance);
routes.post('/users/:id/order/rent_car', actions.userOrderCar);
routes.get('/users/:id/order', actions.userListOrders);
routes.post('/users/:id/order/reserve_spot', actions.userReserveSpot);
routes.delete('/users/:id/order/:reserveId', actions.userCancelReserveTicket);
routes.post('/login', actions.loginUser);



module.exports = routes;