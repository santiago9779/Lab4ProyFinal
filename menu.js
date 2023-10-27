import express from "express";
import { db } from "./db.js";
import { validationResult,param,body,query } from "express-validator";

export const menuRouter = express
.Router()
//buscar menu completo
.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT id, nombre, descripcion, precio FROM menu");
  res.send(rows);
})
//buscar mesa por numedo de id
.get("/:id", param("id").isInt({min: 1}), async (req, res) => {
  const validacion= validationResult(req);
  if (!validacion.isEmpty()){
    res.status(400).send({errors: validacion.array() });
  }
  const id = req.params.id;
  const [rows, fields] = await db.execute(
    "SELECT id, nombre, descripcion, precio FROM menu WHERE id = :id",
    { id }
  );
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Menu no encontrado" });
  }
})