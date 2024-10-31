<?php
$dsn = 'mysql:dbname=farmaciasistema;host=localhost';

$usuario = 'root';
$contraseña = "";

try {
    $connect = new PDO($dsn, $usuario, $contraseña);
    //echo 'conectado';
} catch (PDOException $e) {
    echo 'Falló la conexión: ' . $e->getMessage();
}

$id = isset($_POST['id_usuario']) ? intval($_POST['id_usuario']) : 0;
$telefono = $_POST['telefono'];
$residencia = $_POST['residencia'];
$correo = $_POST['correo'];
$sexo = $_POST['sexo'];
$adicional = $_POST['adicional'];
if ($id > 0) {
    $query = "UPDATE usuario SET telefono_us = :telefono, residencia_us = :residencia, correo_us = :correo, sexo_us=:sexo, adicional_us= :adicional WHERE id_usuario = :id";
    $statement = $connect->prepare($query);
    $statement->bindParam(':telefono', $telefono, PDO::PARAM_STR);
    $statement->bindParam(':residencia', $residencia, PDO::PARAM_STR);
    $statement->bindParam(':correo', $correo, PDO::PARAM_STR);
    $statement->bindParam(':sexo', $sexo, PDO::PARAM_STR);
    $statement->bindParam(':adicional', $adicional, PDO::PARAM_STR);
    $statement->bindParam(':id', $id, PDO::PARAM_INT);

    if ($statement->execute()) {
        $response = array('status_code' => 200, 'message' => 'Dato updated successfully');
    } else {
        $response = array('status_code' => 500, 'message' => 'Failed to update country');
    }
} else {
    $response = array('status_code' => 400, 'message' => 'Invalid input');
}
echo json_encode($response);
?>