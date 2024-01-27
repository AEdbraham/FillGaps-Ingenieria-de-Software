<?php

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Conectar a la base de datos (reemplazar con tus propias credenciales)
$mysqli = new mysqli('127.0.0.1', 'root', '', 'fillgaps');

// Verificar la conexión
if ($mysqli->connect_error) {
    die("Error de conexión a la base de datos: " . $mysqli->connect_error);
}

// Obtener el ID del PDF desde la URL
$idPDF = $_GET['id_reporte'];

// Consultar la base de datos para obtener la información del PDF
$query = "SELECT reporte FROM revision WHERE id_reporte = $idPDF";
$result = $mysqli->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Construir la ruta completa al PDF
    $pdfLocation = $row['reporte']; // Ajusta la ruta según tu estructura

    // Redirigir a la ubicación del PDF para descargarlo
    header("Content-Type: application/pdf");
    header("Content-Disposition: inline; filename=reporte.pdf"); // Puedes cambiar el nombre del archivo según tus necesidades
    header("Content-Transfer-Encoding: binary");
    header("Accept-Ranges: bytes");

    readfile($pdfLocation); // Mostrar el contenido del PDF

} else {
    echo "PDF no encontrado.";
}

// Cerrar la conexión
$result->free();
$mysqli->close();
?>
