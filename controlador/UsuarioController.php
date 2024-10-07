<?php
include_once '../modelo/Usuario.php';
$usuario= new Usuario();
session_start();
$id_usuario= $_SESSION['usuario'];
if($_POST['funcion']=='buscar_usuario'){
    $json=array();
    $fecha_actual= new DateTime();
    $usuario->obtener_datos($_POST['dato']);
    foreach ($usuario -> objetos as $objeto){
        $nacimiento = new DateTime($objeto ->edad);
        $edad= $nacimiento-> diff($fecha_actual);
        $edad_year=$edad->y;
        $json[]=array(
            'nombre'=>$objeto->nombre_us,
            'apellidos'=>$objeto->apellido_us,
            'edad'=> $edad_year,
            'dni'=>$objeto->dni_us,
            'tipo'=>$objeto->nombre_tipo,
            'telefono'=>$objeto->telefono_us,
            'residencia'=>$objeto->residencia_us,
            'correo'=>$objeto->correo_us,
            'sexo'=>$objeto->sexo_us,
            'adicional'=>$objeto->adicional_us,
        );
    }
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
}
if($_POST['funcion']=='capturar_datos'){
    $json=array();
    $id_usuario=$_POST['id_usuario'];
    $usuario->obtener_datos($id_usuario);
    foreach ($usuario -> objetos as $objeto){
        $json[]=array(
            'telefono'=>$objeto->telefono_us,
            'residencia'=>$objeto->residencia_us,
            'correo'=>$objeto->correo_us,
            'sexo'=>$objeto->sexo_us,
            'adicional'=>$objeto->adicional_us,
        );
    }
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
}


if($_POST['funcion']=='editar_usuario'){
    $id_usuario=$_POST['id_usuario'];
    $telefono=$_POST['telefono'];
    $residencia=$_POST['residencia'];
    $correo=$_POST['correo'];
    $sexo=$_POST['sexo'];
    $adicional=$_POST['adicional'];
    $usuario->editar($id_usuario,$telefono,$residencia,$correo,$sexo,$adicional);
    echo 'editado';
}


if($_POST['funcion']=='cambiar_contra'){
    $id_usuario=$_POST['id_usuario'];
    $oldpass=$_POST['oldpass'];
    $newpass=$_POST['newpass'];
    $usuario-> cambiar_contra($id_usuario, $oldpass, $newpass);

}

if($_POST['funcion']=='cambiar_foto'){
    if (($_FILES['photo']['type'] == 'image/jpeg')||($_FILES['photo']['type'] == 'image/png')|| ($_FILES['photo']['type'] == 'image/gif')){
        $nombre=uniqid()."-".$_FILES['photo']['name'];
        $ruta= '../img/'.$nombre;
        move_uploaded_file($_FILES['photo']['tmp_name'], $ruta);
        $usuario->cambiar_photo($id_usuario, $nombre);
        foreach($usuario->objetos as $objeto){
            unlink('../img/'.$objeto->avatar);
        }

    }
    else{

    }
  }

?>
