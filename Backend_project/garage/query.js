const con = require('../database');



getAllGaragesQuery = () => {
    const query = "SELECT * FROM backend.garage";
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


getSpecificGarageQuery = (id) => {
    const query = "SELECT * FROM backend.garage WHERE id = ?";
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

returnAvailableSpotQuery = (start, hours, id) => {
    const query = "CREATE EVENT garageEvent ON SCHEDULE AT ? + INTERVAL ? HOUR DO UPDATE garage SET available_spots = available_spots + 1 WHERE id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [start, hours, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

removeAvailableSpotQuery = (id) => {
    const query = "UPDATE backend.garage SET available_spots = available_spots -1 WHERE id = ?";
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
garageEventDropQuery = () => {
    const query = "DROP EVENT IF EXISTS garageEvent";
    return new Promise((resolve, reject) => {
        con.query(query, [], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};
returnFreeSpotQuery = (reserveId) => {
    const query = "UPDATE backend.garage SET available_spots = available_spots +1 WHERE id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [reserveId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};
removeSpotTicketQuery = (id) => {
    const query = "DELETE FROM reserve_spot WHERE id = ?";
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


module.exports = {
    getAllGaragesQuery,
    getSpecificGarageQuery,
    returnAvailableSpotQuery,
    removeAvailableSpotQuery,
    garageEventDropQuery,
    returnFreeSpotQuery,
    removeSpotTicketQuery
}