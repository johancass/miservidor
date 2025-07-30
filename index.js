const express = require("express");
const path = require("path");

const generarPagoRouter = require("./Generar_pago");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para parsear JSON si necesitas POST (opcional)
app.use(express.json());

// Router para generar pago
app.use('/', generarPagoRouter);

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
