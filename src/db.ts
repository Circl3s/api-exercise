import mysql from "mysql2/promise";

export default class Database {
    host : string;
    user : string;
    password : string;
    database : string;
    open : boolean;
    pool : mysql.Pool;

    constructor(host : string, user : string, password : string, database : string) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.pool = mysql.createPool({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
        this.open = true;
    }

    public async query(query : string, values : any[]) : Promise<any> {
        try {
            let [rows] = await this.pool.execute(query, values);
            return rows;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async close() {
        this.pool.end().then(() => {
            this.open = false;
            console.log("DB connection closed.");
            return;
        }, (err) => {
            throw err;
        });
    }
}