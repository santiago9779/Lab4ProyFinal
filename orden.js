import express from "express";
import { db } from "./db.js";
import { validationResult, param, body, query } from "express-validator";

export const ordenRouter = express
  .Router()
  //buscar todas las ordenes
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, fecha, estado, id_mesa FROM orden"
    );
    res.send(rows);
  })

  //buscar orden por id
  .get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
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

  //buscar mesa por id de orden
  .get("/:id/mesa", async (req, res) => {
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

  //agregar orden (post)
  .post("/", async (req, res)=>{
  const {id, fecha, estado, id_mesa} = req.body.orden
  await db.execute('INSERT INTO orden (fecha, estado, id_mesa) VALUES(:fecha, :estado, :id_mesa)',{fecha, estado, id_mesa})
  console.log('ok');
  res.status(201).send({id,fecha,estado,id_mesa})
  })

  /*.post(
    "/",
    body("fecha").isAlpha(),
    body("estado").isAlpha().isLength({ min: 5, max: 20 }),
    body("id_mesa").isInt(),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {fecha, estado, id_mesa} = req.body.orden;
      const [rows] = await db.execute(
        "INSERT INTO orden (fecha, estado, id_mesa) VALUES(:fecha, :estado, :id_mesa)",
        { fecha, estado, id_mesa}
      );
      res.status(201).send({ id: rows.insertId, fecha, estado,id_mesa });
    }
  );*/

//modificar orden (put)
.put('/:id',async(req,res)=>{
  const id = req.params.id;
  const orden = req.body.orden;
  await db.query("UPDATE orden SET ? WHERE id=?",[orden,id]);
  res.send('ok')
})

//eliminar orden (delete)
.delete("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
  const { id } = req.params;
  await db.execute("DELETE FROM orden WHERE id = :id", { id });
  res.send("ok");
});
