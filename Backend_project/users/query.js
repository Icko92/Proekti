const con = require('../database');

getAllUsersQuery = () => {
    const query = "SELECT * FROM backend.user WHERE deleted_on IS NULL";
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getSpecificUserQuery = (id) => {
    const query = "SELECT * FROM backend.user WHERE id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

registerUserQuery = (user, id,  password , salt) => {
    const query = 'INSERT INTO user(id, email, first_name, last_name, address, password, salt) VALUES (?, ?, ? ,? ,? ,? ,?)';
    return new Promise((resolve, reject) => {
        con.query(query, [id, user.email, user.first_name, user.last_name, user.address, password, salt], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

deleteUserQuery = (id) => {
    const query = "UPDATE backend.user SET deleted_on = NOW() WHERE user.id = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

updateUserQuery = (user, id, password, salt ) => {
    const query = "UPDATE backend.user SET first_name = ?, last_name = ?, address = ?, password = ?, salt = ? WHERE user.id = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[ user.first_name, user.last_name, user.address, password, salt, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

userAddPaymentQuery = (card, id) => {
    const query = "INSERT INTO payment(user_id, card_number, balance) VALUES (? ,? ,?)";
    return new Promise((resolve, reject) => {
        con.query(query,[ id, card.card_number, card.balance], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

userChangePaymentQuery = (card, balance ,id) => {
    const query = "UPDATE backend.payment SET card_number = ?, balance = ? WHERE user_id = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[card.card_number, balance, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getBalanceForUserQuery = (id) => {
    const query = "SELECT * FROM backend.payment WHERE user_id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

userUpdateBalanceQuery = (balance ,id) => {
    const query = "UPDATE backend.payment SET balance = ? WHERE user_id = ? ";
    return new Promise((resolve, reject) => {
        con.query(query,[balance, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

userOrderCarQuery = (orderType, amount, userOrder, userId, paymentId) => {
    const query = "INSERT INTO order_ticket(order_type, amount, number_of_days, end_time, user_id, vehicle_id, payment_id) VALUES (?, ?, ?,NOW() + INTERVAL ? DAY, ?, ?, ?);";
    return new Promise((resolve, reject) => {
        con.query(query,[orderType, amount, userOrder.number_of_days, userOrder.number_of_days, userId, userOrder.vehicle_id, paymentId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

userListOrdersQuery = (id) => {
    const query = "SELECT order_ticket.order_type, order_ticket.start_time,order_ticket.end_time ,order_ticket.amount, vehicle.vehicle_name, user.first_name, user.last_name FROM ((order_ticket  INNER JOIN user ON order_ticket.user_id = user.id) INNER JOIN vehicle ON order_ticket.vehicle_id = vehicle.id) WHERE user.id = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

userListReserveSpotQuery = (id) => {
    const query = "SELECT reserve_spot.order_type, reserve_spot.start_time, reserve_spot.end_time ,reserve_spot.amount, garage.name , user.first_name, user.last_name  FROM ((reserve_spot   INNER JOIN user ON reserve_spot.user_id = user.id) INNER JOIN garage ON reserve_spot.garage_id = garage.id) WHERE user.id = ?";
    return new Promise((resolve, reject) => {
        con.query(query,[id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

userReserveSpotQuery = (orderType, amount, userOrder, distance, userId, paymentId) => {
    const query = "INSERT INTO reserve_spot(order_type, amount, number_of_hours, start_time, end_time, distance, user_id, garage_id, payment_id) VALUES (?, ?, ?, ?,start_time + INTERVAL ? HOUR, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        con.query(query,[orderType, amount, userOrder.number_of_hours, userOrder.start_time, userOrder.number_of_hours, distance, userId, userOrder.garage_id, paymentId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getUserByEmailQuery = (email) => {
    const query = "SELECT * FROM backend.user WHERE email = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

getSpecificReserveTicketQuery = (reserveSpotTicketId) => {
    const query = "SELECT * FROM backend.reserve_spot WHERE id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [reserveSpotTicketId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

checkReserveTicketTimeQuery = (reserveSpotTicketId) => {
    const query = "SELECT start_time > (now() + interval 1 hour) IsTrue from reserve_spot where id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [reserveSpotTicketId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};



module.exports = {
    getAllUsersQuery,
    registerUserQuery,
    deleteUserQuery,
    getSpecificUserQuery,
    updateUserQuery,
    userAddPaymentQuery,
    userChangePaymentQuery,
    getBalanceForUserQuery,
    userUpdateBalanceQuery,
    userOrderCarQuery,
    userListOrdersQuery,
    userReserveSpotQuery,
    userListReserveSpotQuery,
    getUserByEmailQuery,
    getSpecificReserveTicketQuery,
    checkReserveTicketTimeQuery
}