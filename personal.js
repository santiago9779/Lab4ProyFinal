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
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }
      const {id, usuario, password } = req.body;
      const passwordHashed = await bcrypt.hash(password, 8);
      await db.query(
        "INSERT INTO personal (usuario, password) VALUES (:usuario, :password)",
        { usuario, password: passwordHashed }
      );
      res.status(201).send({ id, usuario});
    }
  )

  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, usuario, password FROM personal"
    );
    res.send(rows);
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT id, usuario, password FROM personal WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "ususario no encontrado" });
    }
  })

  /*.get("/:id/persona", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT p.id, p.apellido, p.nombre \
      FROM personas p \
      JOIN cuentas c ON p.id = c.persona_id \
      WHERE c.id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Persona no encontrada" });
    }
  })*/

  .delete("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
    const { id } = req.params;
    await db.execute("DELETE FROM personal WHERE id = :id", { id });
    res.send("ok");
  });
