const express = require("express");
const router = express.Router();
const entryRoutes = require("../routes/entry_routes");

router.use('/entries', entryRoutes)

module.exports = router
