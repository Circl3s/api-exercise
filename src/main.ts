import dotenv from "dotenv";
import express from "express";
import {addExitCallback} from "catch-exit";
import Handler from "./handler";
import Database from "./db";

dotenv.config();

const app = express();
const port = 8080;

const db = new Database(
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_PASS,
    process.env.DB_NAME
);
const handler = new Handler(db);

app.use(express.json());

app.get("/list", (req, res) => {
    handler.list().then((result) => {
        res.status(result.status).send(result.body);
    });
});

app.get("/details", (req, res) => {
    handler.details(req.query["id"] as string).then((result) => {
        res.status(result.status).send(result.body);
    });
});

app.put("/update", (req, res) => {
    handler.update(req.body["id"], req.body["name"], req.body["price"]).then((result) => {
        res.status(result.status).send(result.body);
    });
});

app.post("/add", (req, res) => {
    handler.add(req.body["name"], req.body["price"]).then((result) => {
        res.status(result.status).send(result.body);
    });
});

const server = app.listen(port, () => {
    console.log(`API running on port ${port}.`);
});

addExitCallback((signal) => {
    db.close().then(() => {
        server.close();
    });
});