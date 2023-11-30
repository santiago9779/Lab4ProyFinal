import express from "express";
import { db } from "./db.js";
import { validationResult, param, body, query } from "express-validator";
import jwt from "jsonwebtoken";
import passport from "passport";

export const ordenRouter = express
  .Router()
//buscar todas las ordenes -- funciona

  .get("/",passport.authenticate("jwt", { session: false }),
    async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, fecha, estado, id_mesa ,id_personal,id_menu,nombre,descripcion,precio FROM orden ORDER BY id desc"
      
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
      "SELECT id, fecha, estado, id_mesa ,id_personal,id_menu,nombre,descripcion,precio FROM orden WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Orden no encontrada" });
    }
  })


//GENERAR ORDEN...



  .post("/",passport.authenticate("jwt", { session: false }),

    body("estado").isAlpha().isLength({min:4,max:20}),
    body("id_mesa").isInt({min:1}),
    body("id_personal").isInt({min:1}),
    body("id_menu").isInt({min:1}),

    
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {estado,id_mesa,id_personal,id_menu} = req.body;
      await db.query(
      
        "INSERT INTO orden (fecha,estado,id_mesa,id_personal,id_menu) VALUES (CURDATE(),:estado,:id_mesa,:id_personal,:id_menu)",
        {estado,id_mesa,id_personal,id_menu}
      );
      res.status(201).send({estado,id_mesa,id_personal,id_menu});
    }
  )





//modificar orden (put)  -- funciona...


  .put('/:id',async(req,res)=>{
    const {id} = req.params;
    const {fecha, estado, id_mesa, id_personal, id_menu} = req.body;
    const orden = {fecha, estado, id_mesa, id_personal, id_menu} 
    await db.query("UPDATE orden SET ? WHERE id = ?",[orden, id]);
    res.send({id,fecha, estado, id_mesa, id_personal, id_menu})
  })




//eliminar orden (delete) -- funciona...
  .delete("/:id", param("id").isInt({ min: 1,max:2 }), async (req, res) => {
    const { id } = req.params;
    await db.execute("DELETE FROM orden WHERE id = :id", { id });
    res.send("ok");
  })
  
  
;
