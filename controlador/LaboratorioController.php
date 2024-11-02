<?php
include '../modelo/Laboratorio.php';
$laboratorio = new laboratorio();
if($_POST['funcion'] == 'crear'){
    $nombre = $_POST['nombre_laboratorio'];
    $avatar='lab_default';
    $laboratorio->crear($nombre,$avatar);
}
if($_POST['funcion'] == 'buscar'){
    $laboratorio->buscar();
    $json=array();
    foreach ($laboratorio->objetos as  $objeto) {
        $json[]=array(
        'id'=>$objeto->id_laboratorio,
        'nombre'=>$objeto->nombre,
        'avatar'=>'../img/'.$objeto->avatar
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
}
?>