const query = require('./query');

getAllGarages = async (req, res) => {
    try {
        const categories = await query.getAllGaragesQuery();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
};

getSpecificGarage = async (req, res) => {
    try {
        const id = req.params.id;
        const vehicle = await query.getSpecificGarageQuery(id);
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    getAllGarages,
    getSpecificGarage
}