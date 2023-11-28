import express from "express";
import { db } from "./db.js";
import { validationResult, param, body, query } from "express-validator";
export const mesasRouter = express
  .Router()

  //buscar todas las mesas --- funciona
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, capacidad, ocupada FROM mesas"
    );
    res.send(rows);
  })
    
  //buscar mesa por id --- funciona
  .get("/:id", 
  param("id").isInt().isLength({min:1, max:2}), 
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
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
  
  // buscar orden con id de mesa -- funciona -- solucionar registro de orden en tabla mesas
  .get("/:id/orden", 
  param("id").isInt().isLength({ min: 1, max:2 }),
  param("orden").isAlpha().isLength({max:4}), 
  async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT o.id, o.fecha, o.estado \
      FROM orden o \
      JOIN mesas m ON o.id = m.id_orden \
      WHERE m.id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.status(404).send({ mensaje: "Orden no encontrada" });
    }
  })

  // cambiar estado de la mesa
.put('/:id',
param("id").isInt().isLength({min:1,max:2}),
body("capacidad").isNumeric().isLength({min:1,max:2}),
body("ocupada").isInt().isLength({max:1}),
body("id_oreden").isInt().isLength({min:1,max:2}),
 async(req,res)=>{
  const {id} = req.params;
  const {capacidad, ocupada, id_orden} = req.body;
  const mesa = {capacidad, ocupada, id_orden} 
  await db.execute("UPDATE mesas SET capacidad=:capacidad, ocupada=:ocupada WHERE id = :id",{id, capacidad: mesa.capacidad, ocupada: mesa.ocupada});
  res.send({capacidad, ocupada, id_orden})
})