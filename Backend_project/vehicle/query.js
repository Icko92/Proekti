const con = require('../database');

getAllCategoriesQuery = () => {
    const query = "SELECT * FROM backend.vehicle_category";
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

getAllVehiclesQuery = () => {
    const query = "SELECT * FROM backend.vehicle";
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

getAllVehiclesForCategoryQuery = (id) => {
    const query = "SELECT * FROM backend.vehicle WHERE category_id = ?";
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

getSpecificVehicleQuery = (id) => {
    const query = "SELECT * FROM backend.vehicle WHERE id = ?";
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

returnVehicleInStockQuery = (days, id) => {
    const query = "CREATE EVENT rentEvent ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ? DAY DO UPDATE vehicle SET in_stock = in_stock + 1 WHERE id = ?";
    return new Promise((resolve, reject) => {
        con.query(query, [days, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

removeVehicleFromStockQuery = (id) => {
    const query = "UPDATE backend.vehicle SET in_stock = in_stock -1 WHERE id = ?";
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

eventDropQuery = () => {
    const query = "DROP EVENT IF EXISTS rentEvent";
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



module.exports = {
    getAllCategoriesQuery,
    getAllVehiclesQuery,
    getAllVehiclesForCategoryQuery,
    getSpecificVehicleQuery,
    returnVehicleInStockQuery,
    removeVehicleFromStockQuery,
    eventDropQuery
}