import express from "express";
import { db } from "./db.js";
import { validationResult, param, body, query } from "express-validator";

export const menuRouter = express
  .Router()
  
  //buscar menu completo
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, nombre, descripcion, precio FROM menu"
    );
    res.send(rows);
  })

  //buscar mesa por numedo de id
  .get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
    }
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT id, nombre, descripcion, precio FROM menu WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Menu no encontrado" });
    }
  })
  
  // agregar producto a menu

  .post("/",
    body("nombre").isString(),
    body("descripcion").isString(),
    body("precio").isDecimal(),
    async (req, res)=>{  // funciona
    const {id, nombre, descripcion, precio} = req.body
    await db.execute('INSERT INTO menu (nombre, descripcion, precio) VALUES(:nombre, :descripcion, :precio)',
    {nombre, descripcion, precio})
    console.log('ok');
    res.status(201).send({ id, nombre, descripcion, precio}) 
  })


  // modificar menu
  .put('/:id',
  body("nombre").isString(),
  body("descripcion").isString(),
  body("precio").isDecimal(),
  async(req,res)=>{
    const {id} = req.params;
    const {nombre, descripcion, precio} = req.body;
    const menu = {nombre, descripcion, precio} 
    await db.execute("UPDATE menu SET nombre=:nombre, descripcion=:descripcion, precio=:precio WHERE id = :id",{id, nombre: menu.nombre, descripcion: menu.descripcion, precio: menu.precio});
    res.send({id,nombre, descripcion, precio})
  })


  // eliminar menu -- funciona
  .delete("/:id",param("id").isInt({min:1}), async (req,res)=>{
    const{id}=req.params;
    await db.execute("DELETE FROM menu WHERE id = :id", {id});
    res.send("menu eliminado")
  })
