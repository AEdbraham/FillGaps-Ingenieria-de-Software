// sidebar toggle
const btnToggle = document.querySelector('.toggle-btn');
const contenido = document.getElementById('contenido');

/*btnToggle.addEventListener('click', function () {
  console.log('clik')
  document.getElementById('sidebar').classList.toggle('active');
  console.log(document.getElementById('sidebar'))
});*/

btnToggle.addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('active');
  contenido.classList.toggle('active');
});


function generatePDF() {
  // Create a new jsPDF instance
  window.jsPDF = window.jspdf.jsPDF;
  var id_personal = document.getElementById("id_personal").value;
  var pdf = new jsPDF();

  // Add logo to the PDF (replace 'path/to/logo.png' with your logo's file path)
  pdf.addImage('Imagenes/Logo1.png', 'PNG', 10, 10, 40, 40);

  // Add title to the PDF
  pdf.setFontSize(18);
  pdf.text('Solicitud de Articulo', 60, 30);

  // Define variables for vertical positioning
  var currentY = 60;

  // Add content to the PDF
  function addText(text) {
    pdf.text(20, currentY, text);
    currentY += 10; // Adjust the value as needed for spacing
  }

  addText('Nombre del Solicitante: ' + document.getElementById("nombre_solicitante").value);
  addText('Museo Solicitante: ' + document.getElementById("afiliacion").value);
  addText('Correo Electronico de Contacto: ' + document.getElementById("email_solicitante").value);
  addText('Nombre de Articulo: ' + document.getElementById("nombre_articulo").value);

  var descripcionArticulo = 'Descripcion del Articulo: ' + document.getElementById("descripcion_articulo").value;
  var lines = pdf.splitTextToSize(descripcionArticulo, pdf.internal.pageSize.width - 40);

  // Add each line separately to handle line breaks
  for (var i = 0; i < lines.length; i++) {
    addText(lines[i]);
  }

  addText('Autor o creador: ' + document.getElementById("autor_articulo").value);
  addText('Fecha de Creación: ' + document.getElementById("fecha_creacion").value);
  addText('Fuente de Origen: ' + document.getElementById("fuente_origen").value);
  addText('Tipo de Adquisición: (compra, donación, préstamo, etc.): ' + document.getElementById("tipo_adquisicion").value);
  addText('Motivo de la Solicitud: ' + document.getElementById("motivo_solicitud").value);
  addText('Fecha de Necesidad (si aplica):' + document.getElementById("fecha_necesidad").value);
  addText('Notas Adicionales: ' + document.getElementById("notas_adicionales").value);
  addText('Aprobación y Firma (si es necesario):' + document.getElementById("firma_supervisor").value);

  var pdfContent = pdf.output('dataurl');
  var tipo = 'solicitud';

  var pdfFileName = 'Reporte.pdf';

  // Prepare data to send via AJAX
  var formData = new FormData();
  formData.append('id_personal', id_personal);
  formData.append('pdf_data', new Blob([pdfContent], { type: 'application/pdf' }), pdfFileName);
  formData.append('tipo', tipo);

  // Send data to the server using AJAX
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://127.0.0.1:8000/guardar_pdf.php', true);
  xhr.onload = function () {
      if (xhr.status === 200) {
          console.log('PDF guardado exitosamente en la base de datos.');
      } else {
          console.error('Error al guardar el PDF en la base de datos.');
      }
  };
  xhr.send(formData);

  //Mostrar el pdf
  pdf.save(pdfFileName);
  
}
