<?php
include '../modelo/Laboratorio.php';
$laboratorio = new laboratorio();

if ($_POST['funcion'] == 'crear') {
    $nombre = $_POST['nombre_laboratorio'];
    $avatar = 'lab_default.png';
    $laboratorio->crear($nombre, $avatar);
}

if ($_POST['funcion'] == 'buscar') {
    $laboratorio->buscar();
    $json = array();
    foreach ($laboratorio->objetos as $objeto) {
        $json[] = array(
            'id' => $objeto->id_laboratorio,
            'nombre' => $objeto->nombre,
            'avatar' => '../img/lab/' . $objeto->avatar
        );
    }
    echo json_encode($json);
}

if ($_POST['funcion'] == 'cambiar_logo') {
    $id = $_POST["id_logo_lab"];
    
    // Verifica si el archivo ha sido enviado y es del tipo correcto
    if (isset($_FILES['photo']) && ($_FILES['photo']['error'] == UPLOAD_ERR_OK) &&
        ($_FILES['photo']['type'] == 'image/jpeg' || $_FILES['photo']['type'] == 'image/png' || $_FILES['photo']['type'] == 'image/gif')) {
        
        $nombre = uniqid() . "-" . $_FILES['photo']['name'];
        $ruta = '../img/lab/' . $nombre;
        
        // Intenta mover el archivo
        if (move_uploaded_file($_FILES['photo']['tmp_name'], $ruta)) {
            $laboratorio->cambiar_logo($id, $nombre);

            // Elimina el logo anterior si no es el predeterminado
            foreach ($laboratorio->objetos as $objeto) {
                if ($objeto->avatar != "lab_default.png") {
                    unlink('../img/lab/' . $objeto->avatar);  
                }
            }

            $json = array(
                'ruta' => $ruta,
                'alert' => 'edit'
            );
        } else {
            $json = array('alert' => 'upload_error');
        }
    } else {
        $json = array('alert' => 'noedit');
    }
    
    echo json_encode($json);
}
if ($_POST['funcion'] == 'borrar') {
    $id=$_POST['id'];
    $laboratorio->borrar($id);
}
?>
