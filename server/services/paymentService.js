import { ThrowError } from "../utilits/error.js";
import { bills,payments} from "../models/index.js";
export const getBillByUser = async(id)=>{
    try {
        const isGet = await bills.getBillByUser(id);
        if (!isGet.succes) ThrowError("Невдалось отримати інформацію про рахунок", 400);
        return { succes: true, bill: isGet.bill };
    } catch (error) {
        console.log(error)
        return { succes: true, bill: null };
    }
}
export const createBill = async (bill_number,bill_title, id) => {
     try {
         const isCreate = await bills.createBill(bill_number,bill_title, id);
         console.log("Service:",id);
        console.log("Service:",bill_number,bill_title)
        if (!isCreate) ThrowError("Невдалось отримати інформацію про рахунок", 400);
         return true;
    } catch (error) {
        console.log(error)
         return false;
    }
}
export const createPayment = async (sender_id, receiver_id, sum_by_delivery, sum_by_commission, general_sum, car_id) => {
    try {
        const isCreate = await payments.createPayments(sender_id, receiver_id, sum_by_delivery, sum_by_commission, general_sum, car_id);
        if (!isCreate) ThrowError("невдалось додати платежі");
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
export const getPaymentsByUser = async (id) => {
    try {
        const isGet = await payments.getPaymentsByUser(id);
        if (!isGet.succes) ThrowError("Невдалось отримати данні про платежі");
        return { succes: true, payments: isGet.payments }
    } catch (error) {
        console.log(error);
        return { succes: false, payments:[]}
    }
}
export const deposit = async (sum, bill_number,receiver_id) => {
    try {
        const type = "Поповненя рахунку";
        const isDep = await bills.deposit(sum, bill_number);
        console.log("sumService", sum, "bill_number", bill_number);
        if (!isDep) ThrowError("Невдалось поповнити рахунок");
        const isCreate = await payments.createPay(sum,type,receiver_id)
        return true;
    } catch (error) {
         console.log(error);
        return false;
    }
}