// sidebar toggle
const btnToggle = document.querySelector(".toggle-btn");
const contenido = document.getElementById("contenido");

/*btnToggle.addEventListener('click', function () {
  console.log('clik')
  document.getElementById('sidebar').classList.toggle('active');
  console.log(document.getElementById('sidebar'))
});*/

btnToggle.addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("active");
  contenido.classList.toggle("active");
});

$(document).ready(function () {
  var tipo = "reporte";
  // Obtener la lista de PDFs al cargar la página
  obtenerListaPDFs(tipo);

  // Función para obtener la lista de PDFs
  function obtenerListaPDFs(tipo) {
    $.ajax({
      url: "http://127.0.0.1:8000/obtener_pdfs.php?tipo=" + tipo, // Reemplaza con la ruta correcta de tu script PHP
      method: "GET",
      success: function (data) {
        // Llenar la tabla con los datos obtenidos
        console.log("Datos obtenidos:", data);
        llenarTablaPDFs(data);
      },
      error: function (error) {
        console.error("Error al obtener la lista de PDFs:", error);
      },
    });
  }

  // Función para llenar la tabla con los datos de los PDFs
  function llenarTablaPDFs(data) {
    var tbody = $("#pdf-table tbody");
    tbody.empty();

    data.forEach(function (pdf) {
      var fila =
        "<tr>" +
        "<td>" +
        pdf.id_reporte +
        "</td>" +
        "<td> Documento " +
        pdf.id_reporte +
        "</td>" +
        '<td><button class="btn btn-dark ver-pdf" data-id="' +
        pdf.id_reporte +
        '">Ver PDF</button>' +
        '<button class="btn btn-danger eliminar-pdf" data-id="' +
        pdf.id_reporte +
        '">Eliminar</button>' +
        '</td>' +
        "</tr>";
      tbody.append(fila);
    });

    // Agregar el evento de clic para ver el PDF al botón
    $(".ver-pdf").on("click", function () {
      var idPDF = $(this).data("id");
      verPDF(idPDF);
    });
  }

  // Función para cargar y mostrar un PDF
  function verPDF(idPDF) {
    var pdfUrl = "http://127.0.0.1:8000/recuperar_pdf.php?id_reporte=" + idPDF;

     // Crear un enlace temporal para descargar el PDF
    var link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank"; // Abrir en una nueva ventana/tab
    link.download = "reporte.pdf"; // Puedes cambiar el nombre del archivo según tus necesidades
 
     // Simular un clic en el enlace para iniciar la descarga
    link.click();
  }
});
