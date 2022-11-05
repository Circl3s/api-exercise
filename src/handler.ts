import Database from "./db";

export class Result {
    public status : number;
    public body : Object;

    constructor(status : number, body : Object) {
        this.status = status;
        this.body = body;
    }

    public static ok(data : Object, status? : number) : Result {
        return new Result(status ?? 200, {
            success: true,
            error: ``,
            data: data
        });
    }

    public static error(error : String, status? : number) : Result {
        return new Result(status ?? 500, {
            success: false,
            error: error,
            data: {}
        });
    }
}

export default class Handler {
    private db : Database;

    constructor(database : Database) {
        this.db = database;
    }

    public notFound() : Result {
        return Result.error("Not found", 404);
    }

    public async list() : Promise<Result> {
        try {
            const rows = await this.db.query("SELECT * FROM products;", []);
            return Result.ok(rows);
        } catch (err) {
            return Result.error(err.message);
        }
    }

    public async details(id : string) : Promise<Result> {
        try {
            const numId = parseInt(id);
            if (numId !== numId) { // NaN check
                return Result.error(`ID must be a number. (Provided: ${id})`, 400);
            }

            const rows = await this.db.query(`SELECT * FROM products WHERE Id = ?;`, [numId]);

            if (rows.length == 0) {
                return this.notFound();
            }

            return Result.ok(rows);
        } catch (err) {
            return Result.error(err.message);
        }
    }

    public async update(id : string, name : string, price : string) : Promise<Result> {
        try {
            const numId = parseInt(id);
            const numPrice = parseFloat(price);
            if (numId !== numId) { // NaN check
                return Result.error(`ID must be a number. (Provided: ${id})`, 400);
            }
            if (name.length > 100) {
                return Result.error(`Name must be shorter than 100 characters. (Provided: ${name.length})`, 400);
            }
            if (numPrice !== numPrice) { // NaN check
                return Result.error(`Price must be a number. (Provided: ${price})`, 400);
            }

            const data = await this.db.query(`UPDATE products SET Name = ?, Price = ?, UpdateDate = CURRENT_TIMESTAMP() WHERE Id = ?;`, [name, numPrice, numId]);

            if (data.affectedRows == 0) {
                return this.notFound();
            }

            return Result.ok({}, 204);
        } catch (err) {
            return Result.error(err.message);
        }
    }

    public async add(name : string, price : string) : Promise<Result> {
        try {
            const numPrice = parseFloat(price);
            if (name.length > 100) {
                return Result.error(`Name must be shorter than 100 characters. (Provided: ${name.length})`, 400);
            }
            if (numPrice !== numPrice) { // NaN check
                return Result.error(`Price must be a number. (Provided: ${price})`, 400);
            }

            const data = await this.db.query(`INSERT INTO products VALUES (NULL, ?, ?, CURRENT_TIMESTAMP());`, [name, numPrice]);

            return Result.ok({id: data.insertId}, 201)
        } catch (err) {
            return Result.error(err.message);
        }
    }

    public async delete(id : string) : Promise<Result> {
        try {
            const numId = parseInt(id);
            if (numId !== numId) { // NaN check
                return Result.error(`ID must be a number. (Provided: ${id})`, 400);
            }

            const data = await this.db.query(`DELETE FROM products WHERE Id = ?`, [numId]);

            if (data.affectedRows == 0) {
                return this.notFound();
            }

            return Result.ok({}, 204);
        } catch (err) {
            return Result.error(err.message);
        }
    }
}