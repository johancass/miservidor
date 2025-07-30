const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
// Importa el router para generar pagos
const generarPagoRouter = require("Generar_pago.js");
// Middleware para parsear JSON si necesitas POST (opcional)
app.use(express.json());
// Monta el router ANTES de otras rutas, en la ruta /generar-pago
app.use("/generar-pago", generarPagoRouter);

// Ruta raíz: muestra formulario para consultar estado de pago
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "consulta.html"));
});

// Rutas de retorno después del pago (éxito, fallo, pendiente)
app.get('/success', (req, res) => {
  res.send('<h1>✅ Pago exitoso</h1><p>¡Gracias por tu compra!</p>');
});

app.get('/failure', (req, res) => {
  res.send('<h1>❌ El pago falló o fue cancelado</h1>');
});

app.get('/pending', (req, res) => {
  res.send('<h1>⏳ El pago está pendiente</h1>');
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
