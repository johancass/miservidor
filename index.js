const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 4000;

// Ruta raíz: muestra el formulario
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "consulta.html"));
});

// Simula la consulta de estado del pago
app.get("/consulta", (req, res) => {
  const idPago = req.query.id_pago;

  // Simulación de estado (puedes conectar con la API real de MercadoPago más adelante)
  const estadoFicticio = idPago === "12345" ? "Aprobado" : "Pendiente";

  res.send(`<h2>Estado del pago con ID ${idPago}: ${estadoFicticio}</h2>`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
