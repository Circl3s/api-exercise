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
                    data: {rows}
                }
            };
        } catch (err) {
            return {
                status: 500,
                body: {
                    success: false,
                    error: err.message,
                    data: {}
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
                        data: {}
                    }
                };
            }

            const rows = await this.db.query(`SELECT * FROM products WHERE Id = ${numId};`);

            return {
                status: 200,
                body: {
                    success: true,
                    error: ``,
                    data: rows[0]
                }
            };
        } catch (err) {
            return {
                status: 500,
                body: {
                    success: false,
                    error: err.message,
                    data: {}
                }
            };
        }
    }

    public async update(id : string, name : string, price : string) : Promise<Result> {
        try {
            const numId = parseInt(id);
            const numPrice = parseFloat(price);
            if (numId !== numId) { // NaN check
                return {
                    status: 400,
                    body: {
                        success: false,
                        error: `ID must be a number. (Provided: ${id})`,
                        data: {}
                    }
                };
            }
            if (name.length > 100) {
                return {
                    status: 400,
                    body: {
                        success: false,
                        error: `Name must be shorter than 100 characters. (Provided: ${name.length})`,
                        data: {}
                    }
                };
            }
            if (numPrice !== numPrice) { // NaN check
                return {
                    status: 400,
                    body: {
                        success: false,
                        error: `Price must be a number. (Provided: ${price})`,
                        data: {}
                    }
                };
            }

            const data = await this.db.query(`UPDATE products SET Name = '${name}', Price = ${numPrice}, UpdateDate = CURRENT_TIMESTAMP() WHERE Id = ${numId};`);

            return {
                status: 200,
                body: {
                    success: true,
                    error: ``,
                    data: data
                }
            };
        } catch (err) {
            return {
                status: 500,
                body: {
                    success: false,
                    error: err.message,
                    data: {}
                }
            };
        }
    }

    public async add(name : string, price : string) : Promise<Result> {
        try {
            const numPrice = parseFloat(price);
            if (name.length > 100) {
                return {
                    status: 400,
                    body: {
                        success: false,
                        error: `Name must be shorter than 100 characters. (Provided: ${name.length})`,
                        data: {}
                    }
                };
            }
            if (numPrice !== numPrice) { // NaN check
                return {
                    status: 400,
                    body: {
                        success: false,
                        error: `Price must be a number. (Provided: ${price})`,
                        data: {}
                    }
                };
            }

            const data = await this.db.query(`INSERT INTO products VALUES (NULL, "${name}", ${price}, CURRENT_TIMESTAMP());`);

            return {
                status: 200,
                body: {
                    success: true,
                    error: ``,
                    data: data
                }
            };
        } catch (err) {
            return {
                status: 500,
                body: {
                    success: false,
                    error: err.message,
                    data: {}
                }
            };
        }
    }

    public async delete(id : string) : Promise<Result> {
        try {
            const numId = parseInt(id);
            if (numId !== numId) { // NaN check
                return {
                    status: 400,
                    body: {
                        success: false,
                        error: `ID must be a number. (Provided: ${id})`,
                        data: {}
                    }
                };
            }

            const data = await this.db.query(`DELETE FROM products WHERE Id = ${numId}`);

            return {
                status: 200,
                body: {
                    success: true,
                    error: ``,
                    data: data
                }
            };
        } catch (err) {
            return {
                status: 500,
                body: {
                    success: false,
                    error: err.message,
                    data: {}
                }
            };
        }
    }
}