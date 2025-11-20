// Si sirves el frontend desde el mismo ApiEmpleado (8087), deja BASE = ''.
const BASE = window.location.origin.includes('8087') ? '' : 'http://localhost:8087';

const $ = (id) => document.getElementById(id);
const tbody = $('tbody');
const msg = $('msg');

function row(e) {
  return `
    <tr class="hover:bg-zinc-50">
      <td class="py-2">${e.idEmpleado ?? ''}</td>
      <td class="py-2">${e.codEmpleado ?? ''}</td>
      <td class="py-2">${e.nom ?? ''}</td>
      <td class="py-2">${e.car ?? ''}</td>
      <td class="py-2">${e.cole ?? ''}</td>
      <td class="py-2">
        <button class="text-red-600 hover:underline" onclick="eliminar(${e.idEmpleado})">Eliminar</button>
      </td>
    </tr>
  `;
}

async function listar() {
  msg.textContent = 'Cargando...';
  const res = await fetch(`${BASE}/empleado/listar`);
  const data = await res.json();
  tbody.innerHTML = data.map(row).join('');
  msg.textContent = `Se encontraron ${data.length} registros.`;
}

async function buscar() {
  const id = $('buscarId').value;
  if (!id) return;
  const res = await fetch(`${BASE}/empleado/buscar/${id}`);
  if (res.status === 404) {
    msg.textContent = 'No encontrado.';
    tbody.innerHTML = '';
    return;
  }
  const e = await res.json();
  tbody.innerHTML = row(e);
  msg.textContent = '1 registro.';
}

async function grabar(e) {
  e.preventDefault();
  const body = {
    codEmpleado: Number($('codEmpleado').value),
    nom: $('nom').value,
    car: $('car').value,
    cole: $('cole').value
  };
  const res = await fetch(`${BASE}/empleado/grabar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) { msg.textContent = 'Error al grabar.'; return; }
  await listar();
  $('formEmpleado').reset();
}

async function actualizar() {
  const id = $('idEmpleado').value;
  if (!id) { msg.textContent = 'Ingresa el ID para actualizar.'; return; }
  const body = {
    codEmpleado: Number($('codEmpleado').value),
    nom: $('nom').value,
    car: $('car').value,
    cole: $('cole').value
  };
  const res = await fetch(`${BASE}/empleado/actualizar/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (res.status === 404) { msg.textContent = 'ID no encontrado.'; return; }
  await listar();
}

async function eliminar(id) {
  if (!confirm('¿Eliminar registro?')) return;
  await fetch(`${BASE}/empleado/eliminar/${id}`, { method: 'DELETE' });
  await listar();
}

// Eventos
$('formEmpleado').addEventListener('submit', grabar);
$('btnActualizar').addEventListener('click', actualizar);
$('btnListar').addEventListener('click', listar);
$('btnBuscar').addEventListener('click', buscar);
$('btnLimpiar').addEventListener('click', () => {
  $('formEmpleado').reset(); msg.textContent = ''; tbody.innerHTML = '';
});

// Auto-cargar
listar();
