import mysql2 from "mysql2/promise";
import dotenv from "dotenv"
dotenv.config();
class CargoFlow{
    constructor() {
        this.pool = mysql2.createPool({
            host: process.env.DB_HOST || "mysql-3116e2c1-oleg7pazuk-10ca.i.aivencloud.com",
            user: process.env.DB_USER || "avnadmin",
            port: process.env.DB_PORT || 21832,
            database:process.env.DB_NAME || "cargoflow",
            password: process.env.DB_PASSWORD,
           ssl: {
    rejectUnauthorized: false
  }
        })

        this.initialize();
    }
    async initialize() {
            try {
                await this.connection();
            } catch (error) {
                console.error('Помилка ініціалізації бази даних:', {
                    error: error.message,
                    stack: error.stack
                });
                process.exit(1);
            }
        }
    async connection() {
          console.log("Перевірка",process.env.DB_HOST)
  for (let i = 0; i < 10; i++) {
    try {
      const conn = await this.pool.getConnection();
      console.log("✅ MySQL connected");
      conn.release();
      return;
    } catch (err) {
    console.log(`⏳ DB not ready (${i + 1}/10)`);
    console.log("MYSQL ERROR:", err.message);
    await new Promise(r => setTimeout(r, 3000));
}
  }

  throw new Error("❌ DB connection failed");
}
     async Query(sql,params) {
        const [rows] = await this.pool.execute(sql, params);
        return rows;
    }
}
export default CargoFlow;