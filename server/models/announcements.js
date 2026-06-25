class Announcements{
    constructor(db) {
        this.db = db;
    }
    async AddAnnouncement(date_from, date_to, cargo_id, routes_id, sender_id) {
        try {
            const sql = "INSERT INTO announcements (date_from, date_to, cargos_cargo_id, routes_route_id,users_user_id) VALUES(?,?,?,?,?)";
            await this.db.Query(sql, [date_from, date_to, cargo_id, routes_id, sender_id]);
            return {
                isCreate: true}
        } catch (error) {
            console.log(error)
             return{
                isCreate: false
            }
        }
        
    }
    async getAllAnnouncement() {
        try {
            const sql = "SELECT a.create_date,a.date_from,a.date_to,c.*,r.* FROM announcements a JOIN cargos c ON c.cargo_id = a.cargos_cargo_id JOIN routes r ON r.route_id = a.routes_route_id;"
            const row = await this.db.Query(sql);
            return {
                succes: true,
                arr:row
            }
        } catch (error) {
            console.log(error)
            return {
                succes: false
            }
        }
    }
    async getForCargoCard() {
         try {
             const sql = "SELECT r.from_city,r.to_city,c.amount,a.create_date,a.announcement_id,c.type,r.distance FROM announcements a JOIN cargos c ON c.cargo_id=a.cargos_cargo_id JOIN routes r ON r.route_id= a.routes_route_id;"
            const row = await this.db.Query(sql);
            return {
                succes: true,
                arr:row
            }
        } catch (error) {
            console.log(error)
            return {
                succes: false
            }
        }
    }
    async getFiltredCargos(amount_from,amount_to,weight,from_city,to_city) {
        try {
             console.log(amount_from,amount_to,weight,from_city,to_city)
             const sql = "CALL search_announcements(?,?,?,?,?)"
            const row = await this.db.Query(sql,[amount_from,amount_to,weight,from_city,to_city]);
            return {
                succes: true,
                arr:row[0]
            }
        } catch (error) {
            console.log(error)
            return {
                succes: false
            }
        }
    }
    async getCargosByUser(id) {
         try {
             const sql = "SELECT r.from_city,r.to_city,c.amount,a.create_date,a.announcement_id,c.type,r.distance FROM announcements a JOIN cargos c ON c.cargo_id=a.cargos_cargo_id JOIN routes r ON r.route_id= a.routes_route_id WHERE a.users_user_id=?;"
             const row = await this.db.Query(sql, [id]);
            return {
                succes: true,
                arr:row
            }
        } catch (error) {
            console.log(error)
            return {
                succes: false
            }
        }
    }
    async getCargoInfo(id) {
        try {
            const sql = "SELECT r.from_city,r.to_city,r.distance,r.address_from,r.address_to,c.*,u.name,u.phone,u.last_name,u.email,avatar_url,a.announcement_id,a.create_date,a.status,a.date_from,a.date_to FROM announcements a JOIN users u ON a.users_user_id = u.user_id JOIN cargos c ON c.cargo_id = a.cargos_cargo_id JOIN routes r ON r.route_id = a.routes_route_id WHERE a.announcement_id = ?;"
            const row = await this.db.Query(sql, [id]);
            return {
                succes: true,
                arr:row[0]
            }
        } catch (error) {
             console.log(error)
            return {
                succes: false
            }
        }
    }
}
export default Announcements;