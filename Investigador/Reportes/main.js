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
  pdf.text('Reporte de Investigacion', 60, 30);

  // Define variables for vertical positioning
  var currentY = 60;

  // Add content to the PDF
  pdf.setFontSize(14);
  function addText(text) {
    pdf.text(20, currentY, text);
    currentY += 10; // Adjust the value as needed for spacing
  }

  addText('Responsable del Informe: ' + document.getElementById("responsable_reporte").value);
  addText('Fecha del Informe: ' + document.getElementById("fecha_reporte").value);
  addText('Titulo de la Investigacion: ' + document.getElementById("titulo").value);
  addText('Autor: ' + document.getElementById("autor").value);

  var resumen = 'Resumen: ' + document.getElementById("resumen").value;
  var lines = pdf.splitTextToSize(resumen, pdf.internal.pageSize.width - 40);

  // Add each line separately to handle line breaks
  for (var i = 0; i < lines.length; i++) {
    addText(lines[i]);
  }

  var resultados = 'Resultados: ' + document.getElementById("resultados").value;
  var lines = pdf.splitTextToSize(resultados, pdf.internal.pageSize.width - 40);

  // Add each line separately to handle line breaks
  for (var i = 0; i < lines.length; i++) {
      addText(lines[i]);
    }

  var conclusiones = 'Conclusiones: ' + document.getElementById("conclusiones").value;
  var lines = pdf.splitTextToSize(conclusiones, pdf.internal.pageSize.width - 40);
  
  // Add each line separately to handle line breaks
  for (var i = 0; i < lines.length; i++) {
      addText(lines[i]);
      }

  var bibliografia = 'Bibliografía: ' + document.getElementById("bibliografia").value;
  var lines = pdf.splitTextToSize(bibliografia, pdf.internal.pageSize.width - 40);
      
  // Add each line separately to handle line breaks
  for (var i = 0; i < lines.length; i++) {
      addText(lines[i]);
      }

  var pdfContent = pdf.output('dataurl');
  var tipo = 'reporte';
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
