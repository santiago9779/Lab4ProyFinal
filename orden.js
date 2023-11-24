import express from "express";
import { db } from "./db.js";
import { validationResult, param, body, query } from "express-validator";

export const ordenRouter = express
  .Router()
  //buscar todas las ordenes -- funciona
  .get("/", 
  async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, fecha, estado, id_mesa FROM orden"
    );
    res.send(rows);
  })

  //buscar orden por id -- funciona
  .get("/:id", 
  param("id").isInt().isLength({min:1,max:2}), 
  async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
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

  //buscar mesa por id de orden -- funciona
  .get("/:id/mesa",
  param("id").isInt().isLength({min:1, max:2}),
  param("mesa").isLength({max:4}), 
  async (req, res) => {
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
    body("estado").isString().isLength({min:5,max:50}),
    body("id_mesa").isInt().isLength({min:1,max:2}),
    body("id_personal").isInt().isLength({min:1,max:2}),
    body("id_menu").isInt().isLength({min:1,max:2}),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {fecha, estado, id_mesa, id_personal, id_menu} = req.body;
      await db.execute(
        "INSERT INTO orden (fecha, estado, id_mesa, id_personal, id_menu) VALUES(:fecha, :estado, :id_mesa, :id_personal, :id_menu)",
        { fecha, estado, id_mesa, id_personal, id_menu}
      );
      res.status(201).send({fecha, estado, id_mesa, id_personal, id_menu });
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
    param("id").isInt().isLength({min:1,max:2}), 
    body("fecha").isString().isLength({min:8,max:15}),
    body("estado").isString().isLength({min:5,max:50}),
    body("id_mesa").isInt().isLength({min:1,max:2}),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {id} = req.params
      const {fecha, estado, id_mesa} = req.body;
      const orden = {fecha, estado, id_mesa}
      await db.execute(
        "UPDATE orden SET fecha=:fecha, estado=:estado, id_mesa=:id_mesa WHERE id = :id",{id, fecha: orden.fecha, estado: orden.estado, id_mesa: orden.id_mesa });
      res.status(201).send({ id, fecha, estado, id_mesa });
      }
    )
 
//eliminar orden (delete) -- funciona
  .delete("/:id", param("id").isInt().isLength({ min: 1, max:2 }), async (req, res) => {
    const { id } = req.params;
    await db.execute("DELETE FROM orden WHERE id = :id", { id });
    res.send("ok");
  });
