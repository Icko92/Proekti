// const con = require('../database');
var bcrypt = require('bcryptjs');
const uuidv1 = require('uuid/v1');
const query = require('./query');
const vehicleQuery = require('../vehicle/query');
const garageQuery = require('../garage/query');
const helper = require('../helper');
const Distance = require('geo-distance');
const jwt = require('jsonwebtoken')



getAllUsers = async (req, res) => {
    try {
        const users = await query.getAllUsersQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecificUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await query.getSpecificUserQuery(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};


registerUser = async (req, res, next) => {
    try {
        const userRequest = req.body;
        const id = uuidv1();
        const salt = bcrypt.genSaltSync(8);
        const getRounds = bcrypt.getRounds(salt);
        const passHash = bcrypt.hashSync(userRequest.password, getRounds)
        await query.registerUserQuery(userRequest, id,  passHash , salt);
        res.status(201).send("User has been created!");
    } catch (error) {
        res.status(500).send(error.message)
    }
};

deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await query.deleteUserQuery(id);
        res.status(202).send("User has been deleted!");
    } catch (error) {
        res.status(500).send(error.message)
    }
};

updateUser = async (req, res, next) => {
    try {
        const userRequest = req.body;
        const id = req.params.id;
        const salt = bcrypt.genSaltSync(8);
        const getRounds = bcrypt.getRounds(salt);
        const passHash = bcrypt.hashSync(userRequest.password, getRounds)
        await query.updateUserQuery(userRequest, id,  passHash , salt);
        res.status(202).send("User has been updated!");
    } catch (error) {
        res.status(500).send(error.message)
    }
};

userAddPayment = async (req, res, next) => {
    try {
        const card = req.body;
        const id = req.params.id;
        const cardNum = req.body.card_number;
        const cardNumValidate = await helper.validateCard(cardNum);
        if (cardNumValidate == false){
            res.status(409).send({success: false, message: `Card number: ${cardNum} is not valid!`})
            return
        }
        await query.userAddPaymentQuery(card, id);
        res.status(201).send("Payment Added");
    } catch (error) {
        res.status(500).send(error.message)
    }
};

userChangePayment = async (req, res, next) => {
    try {
        const card = req.body;
        const id = req.params.id;
        const cardNum = req.body.card_number;
        const cardNumValidate = await helper.validateCard(cardNum);
        if (cardNumValidate == false){
            res.status(409).send({success: false, message: `Card number: ${cardNum} is not valid!`})
            return
        }
        let oldBalance = await query.getBalanceForUserQuery(id);
        const balance = oldBalance[0].balance + card.balance;
        await query.userChangePaymentQuery(card, balance, id);
        res.status(201).send("Payment Added");
    } catch (error) {
        res.status(500).send(error.message)
    }
};

userUpdateBalance = async (req, res, next) => {
    try {
        const user = req.body;
        const id = req.params.id;
        const cardNum = req.body.card_number;
        const cardNumValidate = await helper.validateCard(cardNum);
        if (cardNumValidate == false){
            res.status(409).send({success: false, message: `Card number: ${cardNum} is not valid!`})
            return
        }
        let oldPayment = await query.getBalanceForUserQuery(id);
        if(oldPayment[0].card_number != user.card_number){
            res.status(409).send({success: false, message: `Card number: ${cardNum} is not valid!`})
            return
        }
        let balance = oldPayment[0].balance + user.balance;
        console.log(id)
        await query.userUpdateBalanceQuery(balance, id);
        res.status(201).send("Balance Updated");
    } catch (error) {
        res.status(500).send(error.message)
    }
};

userOrderCar = async (req, res, next) => {
    try {
        const userOrder = req.body;
        const orderType = 'Rent-A-Car'
        const userId = req.params.id;
        const vehicleId = req.body.vehicle_id;
        const userPayment = await query.getBalanceForUserQuery(userId);
        const userCurrentBalance = userPayment[0].balance;
        const vehicle = await vehicleQuery.getSpecificVehicleQuery(vehicleId);
        const vehiclePrice = vehicle[0].price;
        const numberOfDays = userOrder.number_of_days;
        const amount = vehiclePrice * numberOfDays;
        const paymentId = userPayment[0].id;
        const inStock = vehicle[0].in_stock;

        if(userCurrentBalance < amount){
            res.status(409).send({success: false, message: `Update your balance to: ${vehiclePrice}`})
            return
        };
        if(inStock <= 0){
            res.status(409).send({success: false, message: `${vehicle[0].vehicle_name} is not in stock ATM!`})
            return 
        };
        await vehicleQuery.eventDropQuery();
        await query.userOrderCarQuery(orderType, amount, userOrder, userId, paymentId);
        res.status(201).send("Order Successful!");

        await vehicleQuery.removeVehicleFromStockQuery(vehicleId)
        const userNewBalance = userCurrentBalance - amount;
        await query.userUpdateBalanceQuery(userNewBalance, userId);
        await vehicleQuery.returnVehicleInStockQuery(numberOfDays, vehicleId);

    } catch (error) {
        res.status(500).send(error.message)
    }
};

userListOrders = async (req, res) => {
    try {
        const id = req.params.id;
        const rent = await query.userListOrdersQuery(id);
        const spot = await query.userListReserveSpotQuery(id);
        const tickets = {rent, spot}
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send(error);
    }
};

userReserveSpot = async (req, res, next) => {
    try {
        const userOrder = req.body;
        const orderType = 'Reserve Spot'
        const userId = req.params.id;
        const garageId = req.body.garage_id;
        const userPayment = await query.getBalanceForUserQuery(userId);
        const userCurrentBalance = userPayment[0].balance;
        const garage = await garageQuery.getSpecificGarageQuery(garageId);
        const garagePrice = garage[0].price;
        const numberOfHours = userOrder.number_of_hours;
        const amount = garagePrice * numberOfHours;
        const paymentId = userPayment[0].id;
        const availableSpots = garage[0].available_spots;
        const startTime = userOrder.start_time;
        let myLocation = {
            lat: 42.0075,
            lon: 21.5035
        }
        let garageLocation = {
            lat: garage[0].lat,
            lon: garage[0].lon
        }
        let distance = Distance.between(myLocation, garageLocation).human_readable().distance + " km";
        console.log(distance)



         
        if(userCurrentBalance < amount){
            res.status(409).send({success: false, message: `Update your balance to: ${garagePrice}`})
            return
        };
        if(availableSpots <= 0){
            res.status(409).send({success: false, message: `${garage[0].name} doesn't have available spot`})
            return 
        };

        await garageQuery.garageEventDropQuery();
        await query.userReserveSpotQuery(orderType, amount, userOrder, distance, userId, paymentId);
        res.status(201).send("Reserve Successful!");

        await garageQuery.removeAvailableSpotQuery(garageId)
        const userNewBalance = userCurrentBalance - amount;
        await query.userUpdateBalanceQuery(userNewBalance, userId);
        await garageQuery.returnAvailableSpotQuery(startTime, numberOfHours, garageId);
        

    } catch (error) {
        res.status(500).send(error.message)
    }
};

loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await query.getUserByEmailQuery(email);
        if(user.length < 1){
            res.status(409).send({success: false, message: `Email failed`})
        }
        let auth = bcrypt.compareSync(password, user[0].password);
        if(auth = false){
            res.status(409).send({success: false, message: `Auth failed`})
        }
        const assignToken = jwt.sign({
            email: user[0].email,
            user_id: user[0].id
        }, process.env.JWT_KEY , {expiresIn: "24h"});
        res.status(200).send({message: "Login successful", token: assignToken});
    } catch (error) {
        res.status(500).send(error);
    }
};

userCancelReserveTicket = async (req, res) => {
    try {
        const reserveId = req.params.reserveId;
        const userId = req.params.id;
        const userPayment = await query.getBalanceForUserQuery(userId);
        const userCurrentBalance = userPayment[0].balance;
        const specificRentTicket = await query.getSpecificReserveTicketQuery(reserveId);
        const checkTiketTime = await query.checkReserveTicketTimeQuery(reserveId);
        const garageId = specificRentTicket[0].garage_id;

        if (checkTiketTime.length < 1){
            res.status(409).send({message: "Ticket id not walid"});
        }
        const isTrue = checkTiketTime[0].IsTrue;
        if(isTrue){
            await garageQuery.returnFreeSpotQuery(garageId)
            const userNewBalance = userCurrentBalance + specificRentTicket[0].amount;
            await query.userUpdateBalanceQuery(userNewBalance, userId);
        }

        await garageQuery.removeSpotTicketQuery(reserveId);
        res.status(202).send("Canceled");
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    getAllUsers,
    registerUser,
    deleteUser,
    getSpecificUser,
    updateUser,
    userAddPayment,
    userChangePayment,
    userUpdateBalance,
    userOrderCar,
    userListOrders,
    userReserveSpot,
    loginUser,
    userCancelReserveTicket
}