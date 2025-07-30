const express = require('express');
const mercadopago = require('mercadopago');

// Configura tu token de acceso desde variables de entorno
mercadopago.configure({
  access_token: process.env.srv-d24s0dili9vc73ekhgn0
});

const router = express.Router();

/**
 * Ruta: GET /generar-pago
 * Query Params:
 *   descripcion - descripción del ítem (opcional, default "Producto")
 *   precio      - precio en COP (requerido)
 *   external_reference - referencia externa / usuario_id (opcional)
 */
router.get('/generar-pago', async (req, res) => {
  const descripcion = req.query.descripcion || 'Producto';
  const precio = parseFloat(req.query.precio);
  const external_reference = req.query.external_reference || '';

  if (isNaN(precio) || precio <= 0) {
    return res.status(400).json({ error: 'Precio inválido' });
  }

  const preference = {
    items: [ { title: descripcion, unit_price: precio, quantity: 1 } ],
    external_reference,
    back_urls: {
      success: `${req.protocol}://${req.get('host')}/success`,
      failure: `${req.protocol}://${req.get('host')}/failure`,
      pending: `${req.protocol}://${req.get('host')}/pending`
    },
    notification_url: `${req.protocol}://${req.get('host')}/webhook`,
    auto_return: 'approved'
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point, preference_id: response.body.id });
  } catch (error) {
    console.error('Error creando preferencia:', error);
    res.status(500).json({ error: 'Error al crear preferencia', detalle: error.message });
  }
});

module.exports = router;
