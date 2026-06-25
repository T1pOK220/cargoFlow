class Vehicles{
    constructor(db) {
        this.db = db;
    }
    async AddVehicles(brand,model,typeOfVehicle,year,capacity,volume,status,plate_number,description,id,delivery_price,v_avatar_url,routeId) {
        try {
            const sql = "INSERT INTO vehicles (brand,model,type,year,users_user_id,capacity,cargo_volume,status,plate_number,description,delivery_price,v_avatar_url,routes_route_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
            await this.db.Query(sql, [brand, model, typeOfVehicle, year, id, capacity, volume, status, plate_number, description,delivery_price,v_avatar_url,routeId]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getAllByUser(id) {
        try {
            const sql = "SELECT * from vehicles WHERE users_user_id=?";
            const row = await this.db.Query(sql, [id]);
            return { succes: true, row:row};
        } catch (error) {
            console.log(error);
            return { succes: false, row:row};
        }
    }
    async getAllVehicles() {
        try {
          const sql = "SELECT * from vehicles";
            const row = await this.db.Query(sql);
            return { succes: true, row:row};
        } catch (error) {
            console.log(error);
            return { succes: false, row:row};
        }
    }
    async deleteVehicle(id) {
        try {
            const sql = "DELETE FROM vehicles WHERE vehicle_id = ?";
            await this.db.Query(sql, [id])
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    async updateVehicle(brand, model, plate_number, capacity, type, year, cargo_volume, status, description, v_avatar_url, id)
    {
        console.log(brand, model, plate_number, capacity, type, year, cargo_volume, status, description, v_avatar_url, id)
        try {
            const sql = "UPDATE vehicles SET brand = IF(? IS NOT NULL, ?, brand), model = IF(? IS NOT NULL, ?, model), plate_number = IF(? IS NOT NULL, ?, plate_number), capacity = IF(? IS NOT NULL, ?, capacity), type = IF(? IS NOT NULL, ?, type),  year = IF(? IS NOT NULL, ?, year),  cargo_volume = IF(? IS NOT NULL, ?, cargo_volume), status = IF(? IS NOT NULL, ?, status), description = IF(? IS NOT NULL, ?, description), v_avatar_url = IF(? IS NOT NULL, ?, v_avatar_url) WHERE vehicle_id = ?"
            await this.db.Query(sql, [brand, brand, model, model, plate_number, plate_number, capacity, capacity, type, type, year, year, cargo_volume, cargo_volume, status, status, description, description, v_avatar_url, v_avatar_url,id]);
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    async getFiltred(car_volume_max, car_volume_min, capacity_min, capacity_max, type ) {
        try {
            const sql = "CALL search_transport(?,?,?,?,?)";
            console.log("DB",car_volume_max, car_volume_min, capacity_min, capacity_max, type)
            const row =  await this.db.Query(sql, [car_volume_max, car_volume_min, capacity_min, capacity_max, type]);
            console.log(row[0])
            return {
                succes: true,
                cars: row[0]
            }
        } catch (error) {
             return {
                succes: false,
                cars: null
            }
        }
    }
    async getOneCarInfo(car_id) {
        try {
            const sql = "SELECT v.*,u.user_id,u.name,u.last_name,u.phone,u.email,u.avatar_url,b.bill_number,r.* FROM vehicles v JOIN users u ON v.users_user_id = u.user_id JOIN bills b ON b.users_user_id = v.users_user_id JOIN routes r ON v.routes_route_id = r.route_id WHERE vehicle_id = ?";
            const row = await this.db.Query(sql, [car_id]);
            return { succes: true, carInfo: row[0] };
        } catch (error) {
            console.log(error);
            return { succes: false, carInfo: null };
        }
    }
}
export default Vehicles;