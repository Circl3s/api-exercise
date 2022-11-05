import Database from "./db";

export interface Result {
    status : number;
    body : Object;
}

export default class Handler {
    private db : Database;

    constructor(database : Database) {
        this.db = database;
    }

    public async list() : Promise<Result> {
        try {
            const rows = await this.db.query("SELECT * FROM products");
            return {
                status: 200,
                body: {
                    success: true,
                    error: ``,
                    data: rows
                }
            };
        } catch (err) {
            return {
                status: 500,
                body: {
                    success: false,
                    error: err,
                    data: <string[]>[]
                }
            };
        }
    }
}