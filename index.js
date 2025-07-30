const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 1000;

app.get('/verificar_pago', async (req, res) => {
  const paymentId = req.query.payment_id;
  if (!paymentId) return res.status(400).json({ error: 'Falta payment_id' });

  try {
    const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
      }
    });

    const estado = response.data.status; // "approved", "pending", etc.
    res.json({ estado });

  } catch (error) {
    res.status(500).json({ error: 'Error al consultar pago', detalle: error.response?.data || error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor consultando pagos en puerto ${PORT}`);
});
