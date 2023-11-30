import express from "express";
import cors from "cors";

//importacion de modulos
import { mesasRouter } from "./mesas.js";
import { restauranteRouter } from "./restaurante.js";
import { menuRouter } from "./menu.js";
import { ordenRouter } from "./orden.js";
import { authConfig, authRouter } from "./auth.js";
import { personalRouter } from "./personal.js";

const app = express();

app.use(express.json());
app.use(cors());

authConfig();
// uso de Routers

app.use("/mesas", mesasRouter);
app.use("/restaurante", restauranteRouter);
app.use("/menu", menuRouter);
app.use("/orden", ordenRouter);
app.use("/auth", authRouter)
app.use ("/personal", personalRouter)
//ruta raiz
app.get("/", (req, res) => {
  res.send("RESTAURANTE");
});

app.listen(4000, () => {
  console.log("API en funcionamiento");
});