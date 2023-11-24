import express from "express";
import { db } from "./db.js";
import { validationResult, param, body, query } from "express-validator";

export const mesasRouter = express
  .Router()


  //buscar todas las mesas --- funciona
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, capacidad, ocupada FROM mesa"
    );
    res.send(rows);
  })
  
  
  //buscar mesa por id --- funciona

  .get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT id, capacidad, ocupada FROM mesa WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Mesa no encontrada" });
    }
  })
  
  

// cambiar estado de la mesa
  .put('/:id',
    body("capacidad").isNumeric(),
    body("ocupada").isAlpha(),
    // body("id_oreden").isInt(),
    async(req,res)=>{
    const {id} = req.params;
    const {capacidad, ocupada} = req.body;
    const mesa = {capacidad, ocupada} 
    await db.execute("UPDATE mesa SET capacidad=:capacidad, ocupada=:ocupada WHERE id = :id",{id, capacidad: mesa.capacidad, ocupada: mesa.ocupada});
    res.send({capacidad, ocupada})
  })



;
  
