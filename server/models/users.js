class Users{
    constructor(db) {
        this.db = db;
    }
    async AddUser(name,phone,last_name,email,password) {
        try {
            const sql = "INSERT INTO users (name,phone,last_name,email,password) VALUES(?,?,?,?,?);"
            await this.db.Query(sql, [name, phone, last_name, email, password])
            return true
        }
        catch (err) {
            console.log(err);
            return false
        }
    }
    async FindUserByEmail(email) {
        try {
            const sql = "Select * FROM users WHERE email = ?;"
            const row = await this.db.Query(sql, [email])
            return row[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async DeleteUserById(id) {
        try {
            const sql = "CALL delete_all_by_user(?)"
            await this.db.Query(sql, [id])
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async updateUser(name,last_name,email,phone,id) {
        try {
            const sql = "UPDATE users SET name = IF(? IS NOT NULL, ?, name),last_name = IF(? IS NOT NULL, ?, last_name),email = IF(? IS NOT NULL, ?, email),phone = IF(? IS NOT NULL, ?, phone)WHERE user_id = ?;"
            await this.db.Query(sql,[name,name,last_name,last_name,email,email,phone,phone,id])
            return {succes:true};
        } catch (error) {
            console.error(error);
            return {succes:false};
        }
    }
    async changePassword(password,id) {
        try {
            const sql = "UPDATE users SET password = ? WHERE user_id = ?;"
            await this.db.Query(sql,[password,id])
            return true;
        } catch (error) {
             console.error(error);
            return false;
        }
    }
    async getUserById(id) {
        try {
            const sql = "SELECT * FROM users WHERE user_id = ?";
            const row = await this.db.Query(sql, [id]);
            return {user:row[0],succes:true}
        } catch (error) {
            console.log(error)
            return {succes:false}
        }
    }
    async updateAvatar(path, id) {
        try {
            const sql = "UPDATE users SET avatar_url = ? WHERE user_id = ?";
            await this.db.Query(sql, [path, id]);
            return true;
        } catch (error) {
            console.log(error);
            return false
        }
    }
}
export default Users;