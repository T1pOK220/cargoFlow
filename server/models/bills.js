class Bills{
    constructor(db) {
        this.db = db;
    }
    async getBillByUser(id) {
        try {
            const sql = "SELECT * FROM bills WHERE users_user_id = ?";
            const row = await this.db.Query(sql, [id]);
            return { succes: true, bill: row[0] }
        } catch (error) {
            console.log(error)
            return  { succes: false, bill:null }
        }
    } 
      async createBill(bill_number,bill_title,id) {
        try {
            const sql = "INSERT INTO bills (bill_number,bill_title,users_user_id) VALUES(?,?,?)";
            await this.db.Query(sql, [bill_number,bill_title,id]);
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    } 
    async deposit(sum,bill_number) {
        try {
              const sql = "UPDATE bills SET balance = balance + ? WHERE bill_number = ?";
            await this.db.Query(sql, [sum, bill_number]);
            console.log("sumBD", sum, "bill_number", bill_number);
            return true;
        } catch (error) {
              console.log(error)
            return false;
        }
    }
}
export default Bills;