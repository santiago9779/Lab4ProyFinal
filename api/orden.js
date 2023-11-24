import express from "express";
import { db } from "./db.js";
import { validationResult, param, body, query } from "express-validator";

export const ordenRouter = express
  .Router()
//buscar todas las ordenes -- funciona

  .get("/", 
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


//agregar orden tomando fecha de ordenaror no funciona

/*

  .post("/", async (req, res)=>{
  const {estado, id_mesa, id_personal, id_menu} = req.body.orden
  await db.execute('INSERT INTO orden (fecha, estado, id_mesa, id_personal, id_menu) VALUES (CURDATE(), :estado, :id_mesa, id:personal, id:menu)',{estado, id_mesa, id_personal, id_menu})
  console.log('ok');
  res.status(201).send({id,fecha,estado,id_mesa}) 
  })

*/



//al pasarle valores no esta accediendo a las propiedades del objeto

/*
  .post('/',async(req,res)=>{
  
    const {fecha, estado, id_mesa, id_personal, id_menu} = req.body;
    const orden = {fecha, estado, id_mesa, id_personal, id_menu} 
    console.log(orden);
    await db.query("insert into orden (fecha, estado, id_mesa, id_personal, id_menu) values (?)",[orden]);
    res.send({id,fecha, estado, id_mesa, id_personal, id_menu})
  })
*/


/*
  .post("/orden", async (req, res)=>{
  const {fecha, estado, id_mesa, id_personal, id_menu } = req.body.orden
  await db.execute('INSERT INTO orden (fecha, estado, id_mesa, id_personal, id_menu) VALUES(:fecha, :estado, :id_mesa, :id_personal, :id_menu)',{fecha, estado, id_mesa, id_personal, id_menu})
  console.log('ok');
  res.status(201).send({id,fecha,estado,id_mesa}) 
  })

*/


/*

  .post("/", async (req, res) => {
    const orden = req.body.orden;
    const [rows] = await db.execute(
      "INSERT INTO orden (fecha, estado, id_mesa, id_personal, id_menu) VALUES (:fecha, :estado, :id_mesa, :id_personal, :id_menu)",
      { fecha: orden.fecha, estado: orden.estado, id_mesa: orden.id_mesa, id_personal: orden.id_personal, id_menu: orden.id_menu   }
    );
    res.status(201).send({ ...orden, id: rows.insertId });
  })

*/



  .post(    
    "/",
    body("fecha").isString().isLength({min:5,max:50}),
    body("estado").isString().isLength({min:5,max:50}),
    body("id_mesa").isInt(),
    body("id_personal").isInt(),
    body("id_menu").isInt(),
   
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {fecha, estado, id_mesa,id_personal,id_menu} = req.body;
      console.log(req.body);
      await db.execute(
        "INSERT INTO orden (fecha, estado, id_mesa, id_personal, id_menu) VALUES (: fecha, :estado, :id_mesa, :id_personal, :id_menu)",
        {  fecha, estado, id_mesa,id_personal,id_menu}
      );
      res.status(201).send({fecha, estado, id_mesa,id_personal,id_menu });
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
