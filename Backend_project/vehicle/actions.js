const query = require('./query');

getAllCategories = async (req, res) => {
    try {
        const categories = await query.getAllCategoriesQuery();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
};

getAllVehicles = async (req, res) => {
    try {
        const vehicles = await query.getAllVehiclesQuery();
        res.status(200).send(vehicles);
    } catch (error) {
        res.status(500).send(error);
    }
};

getAllVehiclesForCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const vehicles = await query.getAllVehiclesForCategoryQuery(id);
        res.status(200).send(vehicles);
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecificVehicle = async (req, res) => {
    try {
        const id = req.params.id;
        const vehicle = await query.getSpecificVehicleQuery(id);
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllCategories,
    getAllVehicles,
    getAllVehiclesForCategory,
    getSpecificVehicle
}