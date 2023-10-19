import express from "express";
import { db } from "./db.js";

export const reservacionRouter = express
  .Router()
  //todas las reservaciones 
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT idReservacion, nombreCliente, telefonoCliente, fechaReservacion FROM reservacion"
    );
    res.send(rows);
  })
  //buscar reservacion por numero de id
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
        "SELECT idReservacion, nombreCliente, telefonoCliente, fechaReservacion FROM reservacion WHERE idReservacion = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Reservacion no encontrada" });
    }
  })
  //buscar reservacion por nombre de cliente
  .get("/:nombre", async (req, res) => {
    const nombre = req.params.nombre;
    const [rows, fields] = await db.execute(
        "SELECT idReservacion, nombreCliente, telefonoCliente, fechaReservacion FROM reservacion WHERE nombreCliente = :nombre",
      { nombre }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Reservacion no encontrada" });
    }
  });
