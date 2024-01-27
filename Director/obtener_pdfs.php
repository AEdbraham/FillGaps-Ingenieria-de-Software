<?php

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Conectar a la base de datos (reemplaza con tus propias credenciales)
$mysqli = new mysqli('127.0.0.1', 'root', '', 'fillgaps');

// Verificar la conexión
if ($mysqli->connect_error) {
    die("Error de conexión a la base de datos: " . $mysqli->connect_error);
}

// Obtener el tipo de PDF desde la URL
$tipo = isset($_GET['tipo']) ? $_GET['tipo'] : '';

// Consultar la base de datos para obtener la lista de PDFs
$query = "SELECT id_reporte FROM revision WHERE tipo = '$tipo'";
$result = $mysqli->query($query);

// Obtener los resultados en un array asociativo
$pdfs = [];
while ($row = $result->fetch_assoc()) {
    $pdfs[] = $row;
}

// Devolver los datos como JSON
header('Content-Type: application/json');
echo json_encode($pdfs);

// Cerrar la conexión
$result->free();
$mysqli->close();
?>
