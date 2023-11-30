import express from "express";
import bcrypt from "bcryptjs";
import { db } from "./db.js";
import { body, param, validationResult } from "express-validator";


export const personalRouter = express
  .Router()

  .post(
    "/",
    body("usuario").isAlphanumeric().isLength({ min: 1, max: 25 }),
    body("password").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    }),
    body("rol").isAlpha().isLength({min:4,max:20}),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {id, usuario, password, rol } = req.body;
      const passwordHashed = await bcrypt.hash(password, 8);
      await db.query(
        "INSERT INTO personal (usuario, password, rol) VALUES (:usuario, :password,  :rol)",
        { nombre, rol, usuario, password: passwordHashed }
      );
      res.status(201).send({ id, usuario, password, rol});
    }
  )

  //todos los usuarios
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, usuario, password, rol FROM personal"
    );
    res.send(rows);
  })

  //usuario por id
  .get("/:id",
  param("id").isInt().isLength({min:1,max:2}),
   async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT id, usuario, password, rol FROM personal WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "ususario no encontrado" });
    }
  })

  //modificar usuario
  .put(    
    "/:id",
    param("id").isInt().isLength({min:1,max:2}), 
    body("usuario").isString().isLength({min:8,max:15}),
    body("password").isString().isLength({min:5,max:50}),
    body("rol").isAlpha({min: 4, max:10}),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {id} = req.params
      const {usuario, password, rol} = req.body;
      const persona = {usuario, password, rol}
      await db.execute(
        "UPDATE personal SET usuario=:usuario, password=:password, rol=:rol WHERE id = :id",{id, usuario: persona.usuario, password: persona.password,rol: persona.rol});
      res.status(201).send({ id, usuario, password, rol });
  })

//eliminar usuario
  .delete("/:id", 
  param("id").isInt().isLength({min:1, max:2}),
  async (req, res) => {
    const { id } = req.params;
    await db.execute('DELETE FROM personal WHERE id = :id', { id });
    res.send("ok");
  }); 
