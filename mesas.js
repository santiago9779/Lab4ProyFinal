import express from "express";
import { db } from "./db.js";
import { validationResult,param,body,query } from "express-validator";

export const mesasRouter = express
.Router()
//buscar todas las mesas
.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT id, capacidad, ocupada FROM mesas");
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
    "SELECT id, capacidad, ocupada FROM mesas WHERE id = :id",
    { id }
  );
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Mesa no encontrada" });
  }
})
// buscar orden con id de mesa
.get("/:id",)

//buscar reservacion con id mesa

// cambiar estado de la mesa


