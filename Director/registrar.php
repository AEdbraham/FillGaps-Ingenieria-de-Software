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

// Obtener datos del formulario
$idAsignado = $_POST['id_asignado'];
$nombreCompleto = $_POST['nombre_completo'];
$fechaNacimiento = $_POST['fecha_nacimiento'];
$lugarResidencia = $_POST['lugar_residencia'];
$curriculumVitae = $_FILES['curriculum_vitae']['name'];
$fotografia = $_FILES['fotografia']['name'];
$puesto = $_POST['puesto'];
$antecedentesPenales = $_POST['antecedentes_penales'];

// Insertar datos en la tabla 'personal'
$queryPersonal = "INSERT INTO personal (nombre_completo, fecha_nacimiento, direccion, curriculum_vitae, fotografia, antecedentes_penales)
                VALUES ('$nombreCompleto', '$fechaNacimiento', '$lugarResidencia', '$curriculumVitae', '$fotografia', '$antecedentesPenales')";

if ($mysqli->query($queryPersonal)) {
    $idPersonal = $mysqli->insert_id; // Obtener el ID autoincrementable asignado

    // Insertar datos en la tabla correspondiente al puesto
    $queryPuesto = "INSERT INTO $puesto (id_personal, id_$puesto)
                VALUES ('$idPersonal', '$idAsignado')";

    if ($mysqli->query($queryPuesto)) {
        echo "Formulario procesado con éxito.";
    } else {
        echo "Error al insertar en la tabla del puesto: " . $mysqli->error;
    }
} else {
    echo "Error al insertar en la tabla 'personal': " . $mysqli->error;
}

// Cerrar la conexión
$mysqli->close();
?>
