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

// Obtener los datos del formulario
$id_personal = $_POST['id_personal'];
$tipo = $_POST['tipo'];

// Guardar el PDF en el servidor
$carpeta_destino = "C:/xampp/htdocs/fillgaps/pdfs/";
$nombre_archivo = $tipo . "_" . $id_personal . ".pdf";  // Puedes ajustar el nombre según tus necesidades

if (move_uploaded_file($_FILES['pdf_data']['tmp_name'], $carpeta_destino . $nombre_archivo)) {
    // El archivo se ha movido exitosamente al servidor

    // Insertar la ruta del archivo en la base de datos
    $ruta_archivo = $carpeta_destino . $nombre_archivo;
    $query = "INSERT INTO revision (id_personal, reporte, tipo) VALUES (?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param('iss', $id_personal, $ruta_archivo, $tipo);

    if ($stmt->execute()) {
        // Obtener el ID de reporte generado automáticamente
        $id_reporte = $stmt->insert_id;

        // Renombrar el archivo PDF para incluir el ID de reporte
        $nuevo_nombre_archivo = $tipo . "_" . $id_reporte . ".pdf";
        rename($carpeta_destino . $nombre_archivo, $carpeta_destino . $nuevo_nombre_archivo);
        $sql = "UPDATE revision SET reporte = 'C:/xampp/htdocs/fillgaps/pdfs/$nuevo_nombre_archivo' WHERE id_reporte = $id_reporte";


        if ($mysqli->query($sql) === TRUE) {
            echo "Registro actualizado correctamente";
        } else {
            echo "Error al actualizar el registro: " . $mysqli->error;
        }

        echo "PDF guardado exitosamente en el servidor y la ruta en la base de datos.";
    } else {
        echo "Error al guardar el PDF en la base de datos: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Error al mover el archivo al servidor.";
}

// Cerrar la conexión
$mysqli->close();
?>
