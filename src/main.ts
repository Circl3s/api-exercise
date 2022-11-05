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

app.get("/products", (req, res) => {
    handler.list().then((result) => {
        res.status(result.status).send(result.body);
    });
});

app.get("/products/:id", (req, res) => {
    handler.details(req.params["id"]).then((result) => {
        res.status(result.status).send(result.body);
    });
});

app.put("/products/:id", (req, res) => {
    handler.update(req.params["id"], req.body["name"], req.body["price"]).then((result) => {
        res.status(result.status).send(result.body);
    });
});

app.post("/products", (req, res) => {
    handler.add(req.body["name"], req.body["price"]).then((result) => {
        res.status(result.status).send(result.body);
    });
});

app.delete("/products/:id", (req, res) => {
    handler.delete(req.params["id"]).then((result) => {
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