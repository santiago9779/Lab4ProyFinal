import express from "express";
import { db } from "./db.js";

export const mesasRouter = express
.Router()
//buscar todas las mesas
.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT id, capacidad, ocupada FROM mesas");
  res.send(rows);
})
//buscar mesa por numedo de id
.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute(
    "SELECT id, capacidad, ocupada FROM mesas WHERE id = :id",
    { id }
  );
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Mesa no encontrada" });
  }
})