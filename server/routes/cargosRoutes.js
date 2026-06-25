import express from "express";
import { AuthMiddleWare} from "../middlewares/AuthMiddlware.js";
import * as cargoController from "../controllers/cargoController.js"
const router = express.Router();
router.post("/api/cargos/create", AuthMiddleWare, cargoController.CargoCreate);
router.get("/api/cargos", AuthMiddleWare, cargoController.Cargos);
router.post("/api/cargos/filter", AuthMiddleWare, cargoController.FiltredCargos);
router.get("/api/cargos/byUser", AuthMiddleWare, cargoController.CargosByUser);
router.get("/api/cargos/info/:id", AuthMiddleWare, cargoController.InfoCargoByOne);
export default router;