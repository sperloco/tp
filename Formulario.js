function obtenerTipoCambio(moneda) {
  if (moneda === 'USD') {
    return 484.00;
  } else if (moneda === 'EUR') {
    return 526.00;
  } else {
    return 1;
  }
}

function validarFormulario() {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var sueldo = document.getElementById('sueldo').value;
  var moneda = document.getElementById('moneda').value;

  var sueldoMinimoARS = 100000;
  var sueldoMinimoConversor = sueldoMinimoARS;

  if (moneda !== 'ARS') {
    var tipoCambio = obtenerTipoCambio(moneda);
    sueldoMinimoConversor = sueldoMinimoARS / tipoCambio;
  }

  if (parseFloat(sueldo) < sueldoMinimoConversor) {
    alert('El sueldo mínimo es de ' + sueldoMinimoARS + ' ARS (' + sueldoMinimoConversor + ' ' + moneda + ').');
    return false;
  }

  if (moneda !== 'ARS') {
    var tipoCambio = obtenerTipoCambio(moneda);
    sueldo = parseFloat(sueldo) * tipoCambio;
  }

  var datosGuardados = JSON.parse(localStorage.getItem('datosGuardados')) || [];
  var nuevoDato = {
    nombre: nombre,
    apellido: apellido,
    sueldo: sueldo
  };
  datosGuardados.push(nuevoDato);
  localStorage.setItem('datosGuardados', JSON.stringify(datosGuardados));

  limpiarFormulario();

  return true;
}

function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('sueldo').value = '';
  document.getElementById('moneda').value = 'ARS';
}

function mostrarDatosGuardados() {
  var datosGuardados = JSON.parse(localStorage.getItem('datosGuardados')) || [];
  datosGuardados.sort(function(a, b) {
    return parseFloat(a.sueldo) - parseFloat(b.sueldo);
  });

  var datosContainer = document.getElementById('datosContainer');
  datosContainer.innerHTML = '';

  var lista = document.createElement('ul');
  for (var i = 0; i < datosGuardados.length; i++) {
    var dato = datosGuardados[i];
    var item = document.createElement('li');
    item.textContent = dato.nombre + ' ' + dato.apellido + ' - Sueldo: ' + dato.sueldo + ' ARS';
    lista.appendChild(item);
  }

  datosContainer.appendChild(lista);
}
