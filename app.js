const modal = document.getElementById('modal');
const content = document.getElementById('tool-content');

function openTool(type) {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');

  const tools = {
    percentage: {
      title: 'Calculadora de porcentajes',
      html: '<form class="tool-form" onsubmit="calcPct(event)"><label>Porcentaje</label><input id="pct" type="number" step="any" placeholder="18" required><label>De</label><input id="base" type="number" step="any" placeholder="240" required><button class="button primary">Calcular</button><div id="pct-result"></div></form>'
    },
    vat: {
      title: 'Calculadora de IVA',
      html: '<form class="tool-form" onsubmit="calcVat(event)"><label>Precio (€)</label><input id="price" type="number" step="any" placeholder="100" required><label>IVA (%)</label><input id="vat" type="number" step="any" value="21" required><button class="button primary">Calcular</button><div id="vat-result"></div></form>'
    },
    convert: {
      title: 'Conversor de unidades',
      html: '<form class="tool-form" onsubmit="convertUnit(event)"><label>Cantidad</label><input id="amount" type="number" step="any" placeholder="10" required><label>Conversión</label><select id="unit"><option value="kmmi">km → millas</option><option value="mft">metros → pies</option><option value="kglb">kg → libras</option><option value="cf">°C → °F</option></select><button class="button primary">Convertir</button><div id="conv-result"></div></form>'
    },
    time: {
      title: 'Calculadora de tiempo',
      html: '<form class="tool-form" onsubmit="calcTime(event)"><label>Horas</label><input id="hours" type="number" min="0" placeholder="2" required><label>Minutos</label><input id="mins" type="number" min="0" placeholder="30" required><button class="button primary">Convertir a minutos</button><div id="time-result"></div></form>'
    },
    password: {
      title: 'Generador de contraseñas',
      html: '<div class="tool-form"><label>Longitud</label><input id="plen" type="number" min="8" max="64" value="18"><button class="button primary" onclick="genPass()">Generar</button><div id="pass-result" class="result"></div></div>'
    },
    names: {
      title: 'Generador de nombres',
      html: '<div class="tool-form"><p>Ideas rápidas para tu próximo proyecto.</p><button class="button primary" onclick="genName()">Generar nombre</button><div id="name-result" class="result"></div></div>'
    }
  };

  if (tools[type]) {
    content.innerHTML = '<h2>' + tools[type].title + '</h2>' + tools[type].html;
  }
}

function closeTool() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

modal.addEventListener('click', (event) => {
  if (event.target === modal) closeTool();
});

function calcPct(event) {
  event.preventDefault();
  const result = (Number(document.getElementById('pct').value) * Number(document.getElementById('base').value)) / 100;
  document.getElementById('pct-result').innerHTML = '<div class="result">' +
    result.toLocaleString('es-ES', { maximumFractionDigits: 2 }) + '</div>';
}

function calcVat(event) {
  event.preventDefault();
  const price = Number(document.getElementById('price').value);
  const vat = Number(document.getElementById('vat').value);
  const iva = price * vat / 100;
  document.getElementById('vat-result').innerHTML =
    '<div class="result">' + (price + iva).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) +
    '</div><p>IVA: ' + iva.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) + '</p>';
}

function convertUnit(event) {
  event.preventDefault();
  const amount = Number(document.getElementById('amount').value);
  const unit = document.getElementById('unit').value;
  const conversions = {
    kmmi: amount * 0.621371,
    mft: amount * 3.28084,
    kglb: amount * 2.20462,
    cf: amount * 9 / 5 + 32
  };
  const result = conversions[unit];
  document.getElementById('conv-result').innerHTML =
    '<div class="result">' + result.toLocaleString('es-ES', { maximumFractionDigits: 4 }) + '</div>';
}

function calcTime(event) {
  event.preventDefault();
  const hours = Number(document.getElementById('hours').value);
  const minutes = Number(document.getElementById('mins').value);
  document.getElementById('time-result').innerHTML =
    '<div class="result">' + (hours * 60 + minutes) + ' minutos</div>';
}

function genPass() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*';
  const length = Number(document.getElementById('plen').value);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  document.getElementById('pass-result').textContent = result;
}

function genName() {
  const prefixes = ['Nexo', 'Brilla', 'Pulso', 'Claro', 'Menta', 'Vivo', 'Nube', 'Prisma', 'Rayo', 'Modo'];
  const suffixes = ['Lab', 'ly', 'Hub', 'Flow', 'Base', 'Box', 'Kit', 'Go', 'Pro', 'io'];
  document.getElementById('name-result').textContent =
    prefixes[Math.floor(Math.random() * prefixes.length)] +
    suffixes[Math.floor(Math.random() * suffixes.length)];
}

function subscribe(event) {
  event.preventDefault();
  event.target.innerHTML = '<strong>¡Listo! Te avisaremos cuando haya novedades.</strong>';
}
