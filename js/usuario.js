$(document).ready(function () {
    var funcion='';
    var id_usuario=$('#id_usuario').val();
    buscar_usuario(id_usuario);
    function buscar_usuario(dato) {
        funcion='buscar_usuario';
        $.post('../controlador/UsuarioController.php',{dato, funcion},(Response)=>{
      
            let nombre='';
            let apellidos='';
            let edad='';
            let dni='';
            let tipo='';
            let telefono='';
            let residencia='';
            let correo='';
            let sexo='';
            let adicional='';
            const usuario= JSON.parse(Response);
            nombre+= `${usuario.nombre}`;
            apellidos+= `${usuario.apellidos}`;
            edad+= `${usuario.edad}`;
            dni+= `${usuario.dni}`;
            tipo+= `${usuario.tipo}`;
            telefono+= `${usuario.telefono}`;
            residencia+= `${usuario.residencia}`;
            correo+= `${usuario.correo}`;
            sexo+= `${usuario.sexo}`;
            adicional+= `${usuario.adicional}`;
            $('#nombre_us').html(nombre);
            $('#apellido_us').html(apellidos);
            $('#edad').html(edad);
            $('#dni_us').html(dni);
            $('#us_tipo').html(tipo);
            $('#telefono_us').html(telefono);
            $('#residencia_us').html(residencia);
            $('#correo_us').html(correo);
            $('#sexo_us').html(sexo);
            $('#adicional_us').html(adicional);
        })
    }
})