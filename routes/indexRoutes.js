const express = require("express");
const indexController = require("../controller/indexController");
const { verificaToken } = require("../middlewares/indexValidator");
const router = express.Router();

router.get("/usuarios", verificaToken, indexController.mostrar);
router.post("/usuarios", indexController.crear);
router.post("/login", indexController.login);

module.exports = router;
