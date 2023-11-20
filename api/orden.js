import express from "express";
import { db } from "./db.js";
import { validationResult, param, body, query } from "express-validator";

export const ordenRouter = express
  .Router() 
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id_orden, fecha,cantidad, estado, id_mesa,id_menu FROM orden"
    );
    res.send(rows);
  })

  .get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT id_orden, fecha,cantidad, estado FROM orden WHERE id_orden = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Orden no encontrada" });
    }
  })

  //buscar mesa por id de orden -- funciona
  .get("/:id/mesa",
  param("id").isInt({min:1,max:2}), async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT m.id, m.capacidad, m.ocupada \
      FROM mesas m \
      JOIN orden o ON m.id = o.id_mesa \
      WHERE o.id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Mesa no encontrada" });
    }
  })

  //agregar orden (post) -- funciona
  /*.post("/", async (req, res)=>{
  const {id, fecha, estado, id_mesa} = req.body.orden
  await db.execute('INSERT INTO orden (fecha, estado, id_mesa) VALUES(:fecha, :estado, :id_mesa)',{fecha, estado, id_mesa})
  console.log('ok');
  res.status(201).send({id,fecha,estado,id_mesa}) 
  })*/

  .post(    
    "/",
    body("fecha").isString().isLength({min:8,max:15}),
    body("estado").isString(),
    body("id_mesa").isInt(),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {fecha, estado, id_mesa} = req.body;
      await db.execute(
        "INSERT INTO orden (fecha, estado, id_mesa) VALUES(:fecha, :estado, :id_mesa)",
        { fecha, estado, id_mesa}
      );
      res.status(201).send({ id, fecha, estado, id_mesa });
    }
  )

//modificar orden (put)  -- funciona
  /*.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const {fecha, estado, id_mesa} = req.body;
    const orden = {fecha, estado, id_mesa} 
    await db.query("UPDATE orden SET ? WHERE id = ?",[orden, id]);
    res.send({id,fecha,estado,id_mesa})
  })*/

  .put(    
    "/:id",
    body("fecha").isString(),
    body("estado").isString(),
    body("id_mesa").isInt(),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {id} = req.params
      const {fecha, estado, id_mesa} = req.body;
      const orden = {fecha, estado, id_mesa}
      await db.query(
        "UPDATE orden SET ? WHERE id = ?",[orden,id]);
      res.status(201).send({ id, fecha, estado, id_mesa });
      }
    )
 
//eliminar orden (delete) -- funciona
  .delete("/:id", param("id").isInt({ min: 1,max:2 }), async (req, res) => {
    const { id } = req.params;
    await db.execute("DELETE FROM orden WHERE id = :id", { id });
    res.send("ok");
  });