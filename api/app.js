import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

// Conectar a base de datos
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  namedPlaceholders: true,
});
console.log("Conectado a base de datos");

// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});


// GET /tareas: Leer todas las tareas

// orden
app.get("/orden", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM orden");
  res.send(rows);
});

// mesa
app.get("/mesa", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM mesa");
  res.send(rows);
});

// personal
app.get("/personal", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM personal");
  res.send(rows);
});

// menu
app.get("/menu", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM menu");
  res.send(rows);
});


//
// GET /tareas/:id: Leer tareas con :id
//

// orden
app.get("/orden/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute("SELECT * FROM orden WHERE id_orden=:id", {
    id,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: " no encontrada" });
  }
});

// mesa
app.get("/mesa/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute("SELECT * FROM mesa WHERE id_mesa=:id", {
    id,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: " no encontrada" });
  }
});

// personal
app.get("/personal/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute("SELECT * FROM personal WHERE id_personal=:id", {
    id,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: " no encontrada" });
  }
});

// menu
app.get("/menu/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute("SELECT * FROM mesa WHERE id_menu=:id", {
    id,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: " no encontrada" });
  }
});


//
// POST /tareas: Agregar nueva tarea
//

//mesa
app.post("/mesa", async (req, res) => {
  const mesa = req.body.mesa;
  const [rows] = await db.execute(
    "INSERT INTO mesa (numero, capacidad) VALUES (:numero, :capacidad)",
    { numero: mesa.numero, capacidad: mesa.capacidad }
  );
  res.status(201).send({ ...mesa, id: rows.insertId });
});

// menu   NO FUNCIONA
app.post("/menu", async (req, res) => {
  const menu = req.body.menu;
  const [rows] = await db.execute(
    "INSERT INTO menu (nombre, descripcion,categoria,precio) VALUES (:nombre, :descripcion, :categoria, : precio)",
    { nombre: menu.nombre.toString(), descripcion: menu.descripcion.toString(), categoria: menu.categoria.toString(), precio: menu.precio }
  );
  res.status(201).send({ ...menu, id: rows.insertId });
});



//personal NO FUNCIONA
app.post("/personal", async (req, res) => {
  const personal = req.body.personal;
  const [rows] = await db.execute(
    "INSERT INTO personal (nombre, apellido,usuario,contraseña) VALUES (:nombre, :apellido, :usuario, : contraseña)",
    { nombre: personal.nombre, apellido: personal.apellido, usuario: personal.usuario, contraseña: personal.contraseña }
  );
  res.status(201).send({ ...personal, id: rows.insertId });
});


// PUT /tareas/:id: Modificar tarea con :id
app.put("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  const tarea = req.body.tarea;
  await db.execute(
    "UPDATE tareas SET descripcion=:descripcion, lista=:lista WHERE id=:id",
    { id, descripcion: tarea.descripcion, lista: tarea.lista }
  );
  res.send("ok");
});

// DELETE /tareas/:id: Quitar tarea con :id
app.delete("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  await db.execute("DELETE FROM tareas WHERE id=:id", { id });
  res.send("ok");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});
