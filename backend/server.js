const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Puerto - IMPORTANTE: Usa process.env.PORT para Render
const PORT = process.env.PORT || 4000;


// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API de Gastos funcionando correctamente");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error de conexión a MongoDB:", error.message);
  });