<?php
// Configura tus credenciales de PayU aquí
$apiKey = "TU_API_KEY";
$merchantId = "TU_MERCHANT_ID";
$accountId = "TU_ACCOUNT_ID";
$referenceCode = isset($_GET['id']) ? $_GET['id'] : 'pedido123';
$amount = "10000"; // Monto en COP
$currency = "COP";
$description = "Pago generado desde ESP";

// Firma digital (según documentación de PayU)
$signature = md5($apiKey . "~" . $merchantId . "~" . $referenceCode . "~" . $amount . "~" . $currency);

// Datos para la solicitud
$data = [
    "merchantId" => $merchantId,
    "accountId" => $accountId,
    "description" => $description,
    "referenceCode" => $referenceCode,
    "amount" => $amount,
    "currency" => $currency,
    "signature" => $signature,
    "test" => "1", // Cambiar a 0 en producción
    "buyerEmail" => "comprador@email.com",
    "responseUrl" => "https://tuweb.com/response",
    "confirmationUrl" => "https://tuweb.com/confirmacion"
];

// Construir formulario automático
$form = '<form id="payuForm" method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway/">
';
foreach ($data as $name => $value) {
    $form .= '<input name="' . $name . '" type="hidden" value="' . $value . '">' . "\n";
}
$form .= '</form><script>document.getElementById("payuForm").submit();</script>';

// Imprimir el HTML que redirige automáticamente
echo $form;
?>
