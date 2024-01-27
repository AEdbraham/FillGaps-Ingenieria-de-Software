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
  pdf.addImage('../Imagenes/Logo1.png', 'PNG', 10, 10, 40, 40);

  // Add title to the PDF
  pdf.setFontSize(18);
  pdf.text('Reporte de Incidentes', 60, 30);

  // Define variables for vertical positioning
  var currentY = 60;

  // Add content to the PDF
  function addText(text) {
    pdf.text(20, currentY, text);
    currentY += 10; // Adjust the value as needed for spacing
  }

  addText('Fecha y Hora del Incidente: ' + document.getElementById("fecha_hora_incidente").value);
  addText('Ubicacion del incidente: ' + document.getElementById("ubicacion_incidente").value);
  addText('Nombre del Reportante: ' + document.getElementById("nombre_reportante").value);
  addText('Tipo de Incidente: ' + document.getElementById("tipo_incidente").value);

  var descripcionIncidente = 'Descripcion Detallada del Incidente: ' + document.getElementById("descripcion_incidente").value;
  var lines = pdf.splitTextToSize(descripcionIncidente, pdf.internal.pageSize.width - 40);

  // Add each line separately to handle line breaks
  for (var i = 0; i < lines.length; i++) {
    addText(lines[i]);
  }

  addText('Efectos o daños causados: ' + document.getElementById("efectos_o_danos").value);
  addText('Acciones Correctivas: ' + document.getElementById("acciones_correctivas").value);
  addText(' Medidas Preventivas: ' + document.getElementById("medidas_preventivas").value);
  addText('Firma del reportante:' + document.getElementById("firma_reportante").value);
  addText('Aprobación y seguimiento (si es necesario):' + document.getElementById("aprobacion_seguimiento").value);


  var pdfContent = pdf.output('dataurl');
  var tipo = 'incidente';
  var pdfFileName = 'Reporte.pdf';

  // Prepare data to send via AJAX
  var formData = new FormData();
  formData.append('id_personal', id_personal);
  formData.append('pdf_data', new Blob([pdfContent], { type: 'application/pdf' }));
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
