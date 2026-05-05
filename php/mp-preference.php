<?php
/**
 * Novo Sushi — Mercado Pago Backend
 *
 * SUBIR A: public_html/mp-preference.php en cPanel
 * El ACCESS_TOKEN viene del .htaccess: SetEnv MP_ACCESS_TOKEN "..."
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// ─── ACCESS TOKEN ─────────────────────────────────────────────────────────────
$accessToken = getenv('MP_ACCESS_TOKEN') ?: 'APP_USR-1882171733167726-050513-3f7f572b7c454d30ba7daeb9cd9fedc1-3380861028';

if (empty($accessToken)) {
    http_response_code(500);
    echo json_encode(['error' => 'MP_ACCESS_TOKEN no configurado.']);
    exit();
}
// ──────────────────────────────────────────────────────────────────────────────

// Parse request body
$body = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido en el cuerpo de la petición']);
    exit();
}

// ─── MODO PRUEBA: Producto fijo de 5 MXN ──────────────────────────────────────
// Si el frontend manda test_mode=true, se usa un producto de prueba de $5
$testMode = isset($body['test_mode']) && $body['test_mode'] === true;

if ($testMode) {
    $items = [[
        'title'       => 'Prueba Sistema Novo Sushi',
        'unit_price'  => 5.00,
        'quantity'    => 1,
        'currency_id' => 'MXN',
    ]];
} else {
    if (empty($body['items']) || !is_array($body['items'])) {
        http_response_code(400);
        echo json_encode(['error' => 'items requeridos']);
        exit();
    }
    $items = array_map(function($item) {
        return [
            'title'       => $item['title'] ?? 'Producto',
            'unit_price'  => (float)($item['unit_price'] ?? 0),
            'quantity'    => (int)($item['quantity'] ?? 1),
            'currency_id' => 'MXN',
        ];
    }, $body['items']);
}

// ─── REFERENCIA ÚNICA ─────────────────────────────────────────────────────────
$externalReference = 'NS-' . time() . '-' . rand(1000, 9999);

// ─── BUILD PREFERENCE ─────────────────────────────────────────────────────────
$preference = [
    'items' => $items,
    'payer' => [
        'email' => $body['payer']['email'] ?? 'cliente@novosushi.com'
    ],
    'back_urls' => [
        'success' => 'https://novosushi.com/pago-exitoso.php',
        'failure' => 'https://novosushi.com/pago-exitoso.php',
        'pending' => 'https://novosushi.com/pago-exitoso.php',
    ],
    'auto_return'          => 'approved',
    'statement_descriptor' => 'NOVO SUSHI',
    'external_reference'   => $externalReference,
];

// ─── CALL MERCADO PAGO ────────────────────────────────────────────────────────
$ch = curl_init('https://api.mercadopago.com/checkout/preferences');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($preference),
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $accessToken,
    ],
    CURLOPT_TIMEOUT        => 30,
]);

$response  = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión: ' . $curlError]);
    exit();
}

$data = json_decode($response, true);

if ($httpCode !== 201 || empty($data['init_point'])) {
    http_response_code($httpCode ?: 500);
    echo json_encode([
        'error'   => 'Error de Mercado Pago',
        'details' => $data,
        'status'  => $httpCode,
    ]);
    exit();
}

echo json_encode([
    'init_point'         => $data['init_point'],
    'sandbox_url'        => $data['sandbox_init_point'] ?? null,
    'preference_id'      => $data['id'] ?? null,
    'external_reference' => $externalReference,
]);
