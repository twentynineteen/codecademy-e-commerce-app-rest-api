const getProducts = (req, res) => {
   res.status(200)
}
const getProductId = (req, res) => {
   const id = req.query.id;
   res.status(200).send(`found ${id}`);
}

module.exports = { getProducts, getProductId }