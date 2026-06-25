class Payments{
    constructor(db) {
        this.db = db;
    }
    async createPayments(sender_id,receiver_id,sum_by_delivery,sum_by_commission,general_sum,car_id) {
        try {
            const sql = "CALL create_payment(?,?,?,?,?,?)";
            await this.db.Query(sql, [sender_id, receiver_id, sum_by_delivery, sum_by_commission, general_sum, car_id]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getPaymentsByUser(id) {
        try {
            const sql = "SELECT * FROM payments WHERE parent_payment_id IS NOT NULL AND (sender_id = ? OR receiver_id = ?)";
            const row = await this.db.Query(sql,[id,id]);
            console.log(row);
            return { succes: true, payments: row}
        } catch (error) {
            console.log(error);
        }
    }
    async createPay(sum,type,receiver_id) {
        try {
            const sql = "CALL create_parent_payment(?,?,?)";
            await this.db.Query(sql, [sum, type, receiver_id]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
export default Payments;