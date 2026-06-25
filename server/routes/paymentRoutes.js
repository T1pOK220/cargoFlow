import express from "express";
import { AuthMiddleWare } from "../middlewares/AuthMiddlware.js";
import * as paymentController from "../controllers/paymentController.js"
const router = express.Router();
router.get("/api/payments/bill", AuthMiddleWare, paymentController.getBill);
router.post("/api/payments/createBill", AuthMiddleWare, paymentController.createBillByUser);
router.post("/api/payments/create", AuthMiddleWare, paymentController.CreatePay);
router.get("/api/payments/byUser", AuthMiddleWare, paymentController.getPaymentsByUser);
router.post("/api/payments/deposit", AuthMiddleWare, paymentController.Deposit);
export default router;