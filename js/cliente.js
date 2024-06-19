// cliente.js

// Función para cargar la lista de clientes
function listarClientes() {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
      .then(response => response.json())
      .then(data => {
        data.forEach(cliente => {
          completarFilaCliente(cliente);
        });
        $('#tbl_clientes').DataTable(); // Inicializar DataTables
      })
      .catch(error => console.error('Error al obtener clientes:', error));
  }
  
  // Función para completar una fila de la tabla con los datos del cliente
  function completarFilaCliente(cliente) {
    var fechaFormateada = formatearFechaHora(cliente.fecha); // Formatear la fecha
  
    // Construir la fila HTML
    var fila = `<tr>
      <td>${cliente.id_cliente}</td>
      <td>${cliente.nombres}</td>
      <td>${cliente.apellidos}</td>
      <td>${cliente.email}</td>
      <td>${cliente.celular}</td>
      <td>${fechaFormateada}</td>
    </tr>`;
  
    // Agregar la fila al cuerpo de la tabla
    document.querySelector("#tbl_clientes tbody").innerHTML += fila;
  }
  
  // Función para formatear la fecha y hora
  function formatearFechaHora(fecha) {
    var fechaHoraActual = new Date(fecha);
    var fechaFormateada = fechaHoraActual.toLocaleString('es-ES', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC'
    }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5');
  
    return fechaFormateada;
  }
  
  // Función para inicializar la página de listado de clientes
  function inicializarPaginaClientes() {
    listarClientes();
  }
  
  // Llamada a la función de inicialización cuando la página esté lista
  document.addEventListener('DOMContentLoaded', inicializarPaginaClientes);
  

