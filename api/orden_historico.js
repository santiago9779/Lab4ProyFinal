import express from "express";
import { db } from "./db.js";
import { validationResult, param, body, query } from "express-validator";

export const orden_historicoRouter = express
  .Router()
  //buscar todas las ordenes -- funciona
  .get("/", 
  async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT * FROM orden_historico"
      
    );
    res.send(rows);
  })



  //buscar orden por id -- funciona
  .get("/:id", param("id").isInt({ min: 1 }), 
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT id, fecha, estado FROM orden_historico WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Orden no encontrada" });
    }
  })
;
