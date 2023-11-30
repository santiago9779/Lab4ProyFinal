import express from "express";
import { db } from "./db.js";
import { body, param, query, validationResult } from "express-validator";

export const restauranteRouter = express
  .Router()
   //buscar todas las ordenes -- funciona
   .get("/orden", 
   async (req, res) => {
     const [rows, fields] = await db.execute(
       "SELECT id, fecha, id_mesa, id_menu, nombre, descripcion, precio FROM orden"
     );
     res.send(rows);
   })
   
   .get("/menu", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, nombre, descripcion, precio FROM menu"
    );
    res.send(rows);
  })

  .get("/mesas", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, capacidad, ocupada FROM mesas"
    );
    res.send(rows);
  })

  .post(    
    "/orden",
    body("id_mesa").isInt().isLength({min:1,max:2}),
    body("id_menu").isInt().isLength({min:1,max:2}),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {fecha, id_mesa, id_menu} = req.body;
      await db.execute(
        "INSERT INTO orden (fecha, id_mesa, id_menu) VALUES ( CURDATE(), :id_mesa, :id_menu)",
        { fecha, id_mesa, id_menu}
      );
      res.status(201).send({fecha, id_mesa, id_menu });
    })
