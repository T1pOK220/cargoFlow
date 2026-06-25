import { ThrowError } from "../utilits/error.js";
import * as paymentService from "../services/paymentService.js";
export const getBill = async (req, res) => {
    try {
        const id = req.user.user_id;
        if (!id) ThrowError("Ід не знайдено", 400);
        const isGet = await paymentService.getBillByUser(id);
        if (!isGet.succes) ThrowError("Невдалось отримати дані про рахунок", 400);
        res.status(200).json({
            bill: isGet.bill,
            message: "Отримано успішно"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:error.message
        })
    }
}
export const createBillByUser = async (req, res) => {
    try {
        const id = req.user.user_id;
        const { bill_title, bill_number } = req.body;
        console.log(id);
        console.log(bill_title,bill_number)
        if (!id || !bill_number || !bill_title) ThrowError("Поля пусті", 400);
        const isCreate = await paymentService.createBill(bill_number,bill_title,id);
        if (!isCreate) ThrowError("Невдалось cтворити рахунок", 400);
        res.status(200).json({
            message: "Отримано створено"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:error.message
        })
    }
}
export const CreatePay = async (req, res) => {
    try {
        const { sender_id, receiver_id, sum_by_delivery, sum_by_commission, general_sum, car_id } = req.body;
        console.log(sender_id, receiver_id, sum_by_delivery, sum_by_commission, general_sum, car_id)
        if (!sender_id || !receiver_id || !sum_by_delivery || !sum_by_commission || !general_sum || !car_id) ThrowError("Поля пусті", 400);
        const isCreate = await paymentService.createPayment(sender_id, receiver_id, sum_by_delivery, sum_by_commission, general_sum, car_id);
        if (!isCreate) ThrowError("Невдалось створити платежі");
        res.status(200).json({ message: "Створено успішно" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:error.message
        })
    }
}
export const getPaymentsByUser = async (req, res) => {
    try {
        const id = req.user.user_id;
        if (!id) ThrowError("Незнайдено ід");
        const isGet = await paymentService.getPaymentsByUser(id);
        if (!isGet.succes) ThrowError("Невдалось отримати дані про платежі");
        res.status(200).json({
            message: "успішно отримано",
            payments: isGet.payments
        })
    } catch (error) {
           console.log(error)
        return res.status(400).json({
            message:error.message
        })
    }
}
export const Deposit = async (req, res) => {
    try {
        const { sum, bill_number } = req.body;
        const id = req.user.user_id;
        if (!sum || !bill_number) ThrowError("Поля пусті");
        console.log("sum", sum, "bill_number", bill_number);
        const isDep = await paymentService.deposit(sum, bill_number,id);
        if (!isDep) ThrowError("невдалось поповнити рахунок");
        res.status(200).json({ message: "Поповено успішно" });
    } catch (error) {
         console.log(error)
        return res.status(400).json({
            message:error.message
        })
    }
}