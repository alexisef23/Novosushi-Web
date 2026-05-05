<?php
/**
 * Novo Sushi — Página de Pago Exitoso
 * SUBIR A: public_html/pago-exitoso.php
 */
$paymentId = $_GET['payment_id']         ?? '';
$status    = $_GET['status']             ?? '';
$extRef    = $_GET['external_reference'] ?? '';

$isSuccess = ($status === 'approved');
$isPending = ($status === 'pending' || $status === 'in_process');

$whatsappNumber = '526272796565';
$fecha = date('d/m/Y H:i');
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $isSuccess ? 'Pago Completado' : ($isPending ? 'Pago en Proceso' : 'Pago No Completado') ?> — Novo Sushi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --bg:#0a0a0f;--card:#13131a;--border:#1e1e2e;
      --green:#22c55e;--green-glow:rgba(34,197,94,.15);
      --yellow:#f59e0b;--red:#ef4444;
      --text:#e2e8f0;--muted:#64748b;--accent:#c8a26b;
    }
    body{
      font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);
      min-height:100vh;display:flex;flex-direction:column;
      align-items:center;justify-content:center;padding:2rem 1rem;
    }
    body::before{
      content:'';position:fixed;inset:0;pointer-events:none;
      background:
        radial-gradient(ellipse 60% 40% at 50% 0%,rgba(200,162,107,.08) 0%,transparent 70%),
        radial-gradient(ellipse 40% 30% at 80% 80%,rgba(34,197,94,.05) 0%,transparent 60%);
    }
    .card{
      background:var(--card);border:1px solid var(--border);border-radius:20px;
      padding:2.5rem 2rem;max-width:520px;width:100%;text-align:center;
      position:relative;box-shadow:0 0 60px rgba(0,0,0,.5);
    }
    .status-icon{
      width:80px;height:80px;border-radius:50%;display:flex;
      align-items:center;justify-content:center;margin:0 auto 1.4rem;font-size:2.2rem;
    }
    .status-icon.success{background:var(--green-glow);border:2px solid var(--green);}
    .status-icon.pending{background:rgba(245,158,11,.12);border:2px solid var(--yellow);}
    .status-icon.failure{background:rgba(239,68,68,.1);border:2px solid var(--red);}
    .brand{font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:.4rem;}
    h1{font-size:1.55rem;font-weight:800;margin-bottom:.4rem;color:#fff;}
    h1.success-title{color:var(--green);}
    h1.pending-title{color:var(--yellow);}
    h1.failure-title{color:var(--red);}
    .subtitle{color:var(--muted);font-size:.88rem;margin-bottom:1.6rem;}

    /* Folio badge */
    .folio-badge{
      display:inline-flex;align-items:center;gap:.5rem;
      background:rgba(200,162,107,.12);border:1px solid rgba(200,162,107,.35);
      border-radius:10px;padding:.6rem 1.2rem;margin-bottom:1.5rem;
    }
    .folio-label{font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.12em;}
    .folio-code{font-size:1.7rem;font-weight:800;color:var(--accent);letter-spacing:.25em;}

    /* Details table */
    .details{
      background:rgba(255,255,255,.03);border:1px solid var(--border);
      border-radius:12px;padding:1rem 1.2rem;text-align:left;margin-bottom:1.5rem;
    }
    .detail-row{
      display:flex;justify-content:space-between;align-items:center;
      padding:.38rem 0;font-size:.83rem;
    }
    .detail-row:not(:last-child){border-bottom:1px solid var(--border);}
    .detail-label{color:var(--muted);}
    .detail-value{font-weight:600;color:var(--text);text-align:right;max-width:60%;word-break:break-all;}

    /* Items list */
    .items-section{margin-bottom:1.5rem;text-align:left;}
    .items-title{font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.12em;margin-bottom:.6rem;}
    .item-row{
      display:flex;justify-content:space-between;align-items:center;
      padding:.35rem 0;font-size:.85rem;border-bottom:1px solid var(--border);
    }
    .item-name{color:var(--text);}
    .item-qty{color:var(--muted);margin:0 .4rem;}
    .item-price{font-weight:600;color:var(--accent);}
    .items-total{
      display:flex;justify-content:space-between;padding:.6rem 0 0;
      font-weight:700;font-size:.95rem;
    }

    /* Timer */
    .timer-box{
      background:var(--green-glow);border:1px solid rgba(34,197,94,.3);
      border-radius:10px;padding:.85rem 1.2rem;margin-bottom:1.4rem;font-size:.86rem;
    }
    .timer-box span{font-weight:800;font-size:1.1rem;color:var(--green);}

    /* Buttons */
    .btn-group{display:flex;flex-direction:column;gap:.7rem;}
    .btn{
      display:flex;align-items:center;justify-content:center;gap:.5rem;
      padding:.82rem 1.4rem;border-radius:10px;font-size:.93rem;font-weight:600;
      cursor:pointer;border:none;transition:opacity .2s,transform .15s;text-decoration:none;
    }
    .btn:hover{opacity:.85;transform:translateY(-1px);}
    .btn-whatsapp{background:#25D366;color:#fff;}
    .btn-pdf{background:var(--card);color:var(--accent);border:1px solid var(--accent);}
    .btn-home{background:transparent;color:var(--muted);border:1px solid var(--border);}
    .footer-note{margin-top:1.8rem;font-size:.73rem;color:var(--muted);}
  </style>
</head>
<body>
<div class="card">
  <p class="brand">Novo Sushi · Chihuahua</p>

  <?php if ($isSuccess): ?>
    <div class="status-icon success">✅</div>
    <h1 class="success-title">¡Pago Completado!</h1>
    <p class="subtitle">Tu pedido fue confirmado. Guarda tu folio para seguimiento.</p>

    <!-- Folio (se llena por JS) -->
    <div class="folio-badge">
      <div>
        <div class="folio-label">Folio del Pedido</div>
        <div class="folio-code" id="folioDisplay">----</div>
      </div>
    </div>

    <!-- Detalles del pago -->
    <div class="details">
      <div class="detail-row">
        <span class="detail-label">Estado</span>
        <span class="detail-value" style="color:var(--green)">PAGADO ✅</span>
      </div>
      <?php if ($paymentId): ?>
      <div class="detail-row">
        <span class="detail-label">ID Mercado Pago</span>
        <span class="detail-value"><?= htmlspecialchars($paymentId) ?></span>
      </div>
      <?php endif; ?>
      <div class="detail-row">
        <span class="detail-label">Fecha</span>
        <span class="detail-value"><?= $fecha ?></span>
      </div>
    </div>

    <!-- Items del pedido (se llenan por JS) -->
    <div class="items-section" id="itemsSection" style="display:none">
      <div class="items-title">Detalle del Pedido</div>
      <div id="itemsList"></div>
      <div class="items-total">
        <span>Total</span>
        <span id="itemsTotal" style="color:var(--accent)"></span>
      </div>
    </div>

    <!-- Temporizador -->
    <div class="timer-box" id="timerBox">
      📲 Enviando al WhatsApp del restaurante en <span id="countdown">5</span> seg...
    </div>

    <div class="btn-group">
      <a id="waBtn" href="#" target="_blank" class="btn btn-whatsapp">
        💬 Enviar pedido por WhatsApp
      </a>
      <button onclick="generarPDF()" class="btn btn-pdf">
        📄 Descargar Comprobante PDF
      </button>
      <a href="https://novosushi.com" class="btn btn-home">
        🏠 Volver al menú
      </a>
    </div>

  <?php elseif ($isPending): ?>
    <div class="status-icon pending">⏳</div>
    <h1 class="pending-title">Pago en Proceso</h1>
    <p class="subtitle">Tu pago está siendo verificado. En cuanto se confirme te notificamos.</p>
    <div class="btn-group">
      <a href="https://novosushi.com" class="btn btn-home">🏠 Volver al menú</a>
    </div>

  <?php else: ?>
    <div class="status-icon failure">❌</div>
    <h1 class="failure-title">Pago No Completado</h1>
    <p class="subtitle">Hubo un problema. Puedes intentarlo de nuevo o contactarnos.</p>
    <div class="btn-group">
      <a href="https://novosushi.com" class="btn btn-whatsapp" style="background:var(--red)">
        🔄 Intentar de nuevo
      </a>
      <a href="https://wa.me/526272796565" target="_blank" class="btn btn-whatsapp">
        💬 Contactar por WhatsApp
      </a>
    </div>
  <?php endif; ?>

  <p class="footer-note">Pago procesado de forma segura por Mercado Pago 🔒</p>
</div>

<script>
(function () {
  const WA_NUMBER = '526272796565';
  const paymentId = "<?= htmlspecialchars($paymentId) ?>";
  const serverFecha = "<?= $fecha ?>";
  const isSuccess = <?= $isSuccess ? 'true' : 'false' ?>;

  if (!isSuccess) return;

  // ─── Recuperar pedido guardado por el frontend ────────────────────────────
  let pedido = null;
  try {
    const raw = localStorage.getItem('ns_pedido_pendiente');
    if (raw) pedido = JSON.parse(raw);
  } catch(e) {}

  // Folio: del pedido guardado o derivado del payment_id
  const folio = pedido?.folio
    || (paymentId ? String(paymentId).slice(-4).padStart(4,'0') : Math.floor(Math.random()*9000+1000).toString());

  const items  = pedido?.items  || [];
  const total  = pedido?.total  ?? 0;
  const fecha  = pedido?.fecha  || serverFecha;
  const email  = pedido?.email  || '';

  // ─── Mostrar folio ────────────────────────────────────────────────────────
  const folioEl = document.getElementById('folioDisplay');
  if (folioEl) folioEl.textContent = '#' + folio;

  // ─── Mostrar items ────────────────────────────────────────────────────────
  if (items.length > 0) {
    const section = document.getElementById('itemsSection');
    const list    = document.getElementById('itemsList');
    const totalEl = document.getElementById('itemsTotal');
    if (section) section.style.display = 'block';
    if (list) {
      list.innerHTML = items.map(i =>
        `<div class="item-row">
          <span class="item-name">${i.name}<span class="item-qty">x${i.quantity}</span></span>
          <span class="item-price">$${i.subtotal.toFixed(2)}</span>
        </div>`
      ).join('');
    }
    if (totalEl) totalEl.textContent = '$' + total.toFixed(2) + ' MXN';
  }

  // ─── Construir mensaje WhatsApp ───────────────────────────────────────────
  const itemsTexto = items.length > 0
    ? items.map(i => `• ${i.name} x${i.quantity} — $${i.subtotal.toFixed(2)}`).join('\n')
    : '(sin detalle disponible)';

  const msgWA =
    `🍱 *NOVO SUSHI — NUEVO PEDIDO*\n\n` +
    `📋 Folio: *#${folio}*\n` +
    `Estado: *PAGADO ✅*\n` +
    `ID MP: *${paymentId || '—'}*\n` +
    `Fecha: *${fecha}*\n\n` +
    `*Pedido:*\n${itemsTexto}\n\n` +
    `*Total: $${total.toFixed(2)} MXN*\n\n` +
    `🔥 Por favor inicia la preparación del pedido.`;

  const waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msgWA);

  const waBtn = document.getElementById('waBtn');
  if (waBtn) waBtn.href = waUrl;

  // ─── Temporizador 5 segundos → abrir WhatsApp ─────────────────────────────
  let secs = 5;
  const countEl = document.getElementById('countdown');
  const timerInterval = setInterval(() => {
    secs--;
    if (countEl) countEl.textContent = secs;
    if (secs <= 0) {
      clearInterval(timerInterval);
      window.location.href = waUrl;
      const box = document.getElementById('timerBox');
      if (box) box.innerHTML =
        `📲 <a href="${waUrl}" style="color:var(--green);font-weight:700;">
          Toca aquí si WhatsApp no se abrió
        </a>`;
    }
  }, 1000);

  // ─── Descarga automática del PDF al cargar ────────────────────────────────
  window.addEventListener('load', () => {
    setTimeout(() => generarPDF(), 1800);
    // Limpiar localStorage después de procesar
    setTimeout(() => localStorage.removeItem('ns_pedido_pendiente'), 5000);
  });

  // ─── Exponer función PDF globalmente ─────────────────────────────────────
  window.generarPDF = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });

    // Fondo
    doc.setFillColor(10, 10, 15);
    doc.rect(0, 0, 210, 297, 'F');

    // Encabezado dorado
    doc.setFillColor(200, 162, 107);
    doc.rect(0, 0, 210, 32, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(10, 10, 15);
    doc.text('NOVO SUSHI', 105, 13, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('COMPROBANTE DE PAGO', 105, 21, { align: 'center' });
    doc.text('Chihuahua, México  |  novosushi.com', 105, 28, { align: 'center' });

    // Folio destacado
    let y = 46;
    doc.setFillColor(200, 162, 107, 0.08);
    doc.setDrawColor(200, 162, 107);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, y - 7, 170, 18, 4, 4, 'D');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(200, 162, 107);
    doc.text('FOLIO  #' + folio, 105, y + 5, { align: 'center' });
    y += 22;

    // Información del pago
    doc.setDrawColor(30, 30, 46);
    doc.setLineWidth(0.3);
    doc.line(20, y, 190, y);
    y += 8;

    const infoRows = [
      ['Estado',        'PAGADO ✅'],
      ['ID Mercado Pago', paymentId || '—'],
      ['Fecha',         fecha],
      ['Email',         email || '—'],
    ];

    infoRows.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(label.toUpperCase(), 20, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(226, 232, 240);
      doc.text(String(value), 80, y);
      y += 8;
    });

    y += 4;
    doc.setDrawColor(30, 30, 46);
    doc.line(20, y, 190, y);
    y += 10;

    // Detalle del pedido
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(200, 162, 107);
    doc.text('DETALLE DEL PEDIDO', 20, y);
    y += 8;

    if (items.length > 0) {
      // Cabecera tabla
      doc.setFillColor(20, 20, 30);
      doc.rect(20, y - 5, 170, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(200, 162, 107);
      doc.text('Producto', 24, y + 1);
      doc.text('Cant.', 130, y + 1);
      doc.text('Subtotal', 165, y + 1, { align: 'right' });
      y += 10;

      items.forEach((item, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(15, 15, 25);
          doc.rect(20, y - 5, 170, 9, 'F');
        }
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(226, 232, 240);
        doc.text(String(item.name), 24, y + 1);
        doc.setTextColor(100, 116, 139);
        doc.text(String(item.quantity), 134, y + 1);
        doc.setTextColor(200, 162, 107);
        doc.text('$' + item.subtotal.toFixed(2), 165, y + 1, { align: 'right' });
        y += 9;
      });

      // Total
      y += 4;
      doc.setDrawColor(200, 162, 107);
      doc.setLineWidth(0.5);
      doc.line(100, y, 190, y);
      y += 7;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(226, 232, 240);
      doc.text('TOTAL:', 110, y);
      doc.setTextColor(200, 162, 107);
      doc.text('$' + total.toFixed(2) + ' MXN', 165, y, { align: 'right' });
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text('(Detalle no disponible)', 20, y);
    }

    // Pie de página
    doc.setFillColor(200, 162, 107);
    doc.rect(0, 280, 210, 17, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(10, 10, 15);
    doc.text('Gracias por tu pedido 🍣  |  +52 627 279 6565  |  novosushi.com', 105, 289, { align: 'center' });
    doc.text('Generado automáticamente · Pago procesado por Mercado Pago', 105, 294, { align: 'center' });

    doc.save('comprobante-novosushi-#' + folio + '.pdf');
  };

})();
</script>
</body>
</html>
