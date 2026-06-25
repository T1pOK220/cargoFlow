class Cargos{
    constructor(db) {
        this.db = db;
    }
    async AddCargo(type,weight,description,amount,height,length,width) {
        try {
            const sql = "INSERT INTO cargos (type,weight,description,amount,height,length,width) VALUES(?,?,?,?,?,?,?);"
            const result = await this.db.Query(sql, [type, weight, description, amount, height, length, width]);
            const cargo_id = result.insertId;
            return {
                isCreate: true,
                cargo_id:cargo_id,
             }
        } catch (error) {
            console.log(error);
            return{
                isCreate: false,
             }
        }
    }
}
export default Cargos;