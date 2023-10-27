import express from "express";
import cors from "cors";

//importacion de modulos
import { mesasRouter } from "./mesas.js";
import { reservacionRouter } from "./reservaciones.js";
import {menuRouter} from "./menu.js"
import { ordenRouter } from "./orden.js";


const app = express();

app.use(express.json());
app.use(cors());
// uso de Routers

app.use("/mesas",mesasRouter)
app.use("/reservaciones", reservacionRouter)
app.use("/menu",menuRouter)
app.use("/orden",ordenRouter)

//ruta raiz
app.get("/", (req, res) => {
  res.send("RESTAURANTE");
});

app.listen(4000, () => {
  console.log("API en funcionamiento");
});
