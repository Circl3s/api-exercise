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
            const rows = await this.db.query("SELECT * FROM products;");
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
                    error: err.message,
                    data: <string[]>[]
                }
            };
        }
    }

    public async details(id : string) : Promise<Result> {
        try {
            const numId = parseInt(id);
            if (numId !== numId) { // NaN check
                return {
                    status: 400,
                    body: {
                        success: false,
                        error: `ID must be a number. (Provided: ${id})`,
                        data: <string[]>[]
                    }
                };
            }
            const rows = await this.db.query(`SELECT * FROM products WHERE Id = ${numId};`);
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
                    error: err.message,
                    data: <string[]>[]
                }
            };
        }
    }
}