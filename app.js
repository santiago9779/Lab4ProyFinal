import express from "express";
import cors from "cors";

//importacion de modulos
import { mesasRouter } from "./mesas.js";
import { reservacionRouter } from "./reservaciones.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/mesas",mesasRouter)
app.use("/reservaciones", reservacionRouter)




//ruta raiz
app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.listen(4000, () => {
  console.log("API en funcionamiento");
});
