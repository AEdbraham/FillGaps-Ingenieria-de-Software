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
    window.jsPDF = window.jspdf.jsPDF
    var id_personal = document.getElementById("id_personal").value;
    var pdf = new jsPDF();
  
    // Add logo to the PDF (replace 'path/to/logo.png' with your logo's file path)
    pdf.addImage('Imagenes/Logo1.png', 'PNG', 10, 10, 40, 40);
  
    // Add title to the PDF
    pdf.setFontSize(18);
    pdf.text('Reporte de Condicion', 60, 30);
  
    // Add total incidents to the PDF
    pdf.setFontSize(14);
    pdf.text(20, 60, 'Nombre de la Obra/Objeto: ' + document.getElementById("nombre").value);
    pdf.text(20, 70, 'Número de Catálogo: ' + document.getElementById("catalogo").value);
    pdf.text(20, 80, 'Artista/Autor: ' + document.getElementById("artista").value);
    pdf.text(20, 90, 'Fecha de Creación: ' + document.getElementById("fecha").value);
    pdf.text(20, 100, 'Técnica: ' + document.getElementById("tecnica").value);
    pdf.text(20, 110, 'Dimensiones: ' + document.getElementById("dimensiones").value);
    pdf.text(20, 120, 'Ubicación: ' + document.getElementById("ubicacion").value);
    pdf.text(20, 130, 'No. de inventario: ' + document.getElementById("inventario").value);
    pdf.text(20, 140, 'Condición: ' + document.getElementById("condicion").value);
    pdf.text(20, 150, 'Daños: ' + document.getElementById("danos").value);
    pdf.text(20, 160, 'Desgaste: ' + document.getElementById("desgaste").value);
    pdf.text(20, 170, 'Suciedad: ' + document.getElementById("suciedad").value);
    pdf.text(20, 180, 'Cambios de calor: ' + document.getElementById("cambios").value);
    pdf.text(20, 190, 'Perdida: ' + document.getElementById("perdida").value);
    pdf.text(20, 200, 'Cambios Estructurales: ' + document.getElementById("estructura").value);
    pdf.text(20, 210, 'Comentarios: ' + document.getElementById("comentarios").value);
    pdf.text(20, 220, 'Recomendaciones: ' + document.getElementById("recomendaciones").value);
    pdf.text(20, 230, 'Medidas Preventivas: ' + document.getElementById("medidas").value);
    pdf.text(20, 240, 'Firma: ' + document.getElementById("firma").value);

    var pdfContent = pdf.output('blob');
    var tipo = 'reporte';

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

