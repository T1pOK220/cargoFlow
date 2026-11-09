import express from "express";
import { AuthMiddleWare } from "../middlewares/AuthMiddlware.js";
import * as vehicleController from "../controllers/vehicleController.js"
const router = express.Router();
import upload from "../middlewares/uploadMiddlware.js";
router.post("/api/vehicle/add",AuthMiddleWare,upload.single("avatar"),  (req, res, next) => {
        next();
    },vehicleController.AddVehicle);
router.get("/api/vehicle/byUser", AuthMiddleWare, vehicleController.CarsByUser);
router.patch("/api/vehicle/edit", AuthMiddleWare,upload.single("avatar"),  (req, res, next) => {
        next();
    }, vehicleController.UpdateCar);
router.delete("/api/vehicle/delete/:id", AuthMiddleWare, vehicleController.DeleteCar);
router.get("/api/vehicles", AuthMiddleWare, vehicleController.GetAllCars);
router.post("/api/vehicles/filter", AuthMiddleWare, vehicleController.getFiltredCars);
router.get("/api/vehicles/:id", AuthMiddleWare, vehicleController.getOneCarInfo);
export default router;