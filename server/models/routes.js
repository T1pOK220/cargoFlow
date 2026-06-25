class Routes{
    constructor(db) {
        this.db = db;
    }
    async AddRoute(from_city,to_city,address_from,address_to) {
        try {
            const sql = "INSERT INTO routes (from_city,to_city,address_from,address_to) VALUES(?,?,?,?);"
            const result = await this.db.Query(sql, [from_city, to_city, address_from, address_to]);
            const route_id = result.insertId;
            return {
                isCreate: true,
                route_id:route_id}
        }
        catch (err) {
            console.log(err);
            return { isCreate: false }
        }
    }
    async AddRouteToVehicle(from_city,to_city,address_from,address_to) {
        try {
            const sql = "INSERT INTO routes (from_city,to_city) VALUES(?,?);"
            const result = await this.db.Query(sql, [from_city, to_city]);
            const route_id = result.insertId;
            return {
                isCreate: true,
                route_id:route_id}
        }
        catch (err) {
            console.log(err);
            return { isCreate: false }
        }
    }
}
export default Routes;