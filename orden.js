import express from "express"
import { db } from "./db.js"
import { validationResult,param,body,query } from "express-validator"


export const ordenRouter=express
.Router()
//buscar todas las ordenes
.get("/",async(req,res)=>{
    const [rows,fields]=await db.execute("SELECT id, fecha, estado FROM orden")
})

//buscar orden por id
.get("/:id", param("id").isInt({min: 1}), async (req, res) => {
    const validacion= validationResult(req);
    if (!validacion.isEmpty()){
      res.status(400).send({errors: validacion.array() });
    }
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT id, fecha, estado FROM orden WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Orden no encontrada" });
    }
  })

//buscar mesa por id de orden

//agregar orden (post)
.post("/orden",)
//modificar orden (put)

//eliminar orden (delete)
