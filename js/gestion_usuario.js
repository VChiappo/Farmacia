$(document).ready(function(){
    var tipo_usuario = $('#tipo_usuario').val();
    
     if (tipo_usuario == 2) {
        $('#button-crear').hide();
    }
    buscar_datos();
    var funcion;
    function buscar_datos(consulta) {
        funcion = 'buscar_usuarios_adm';
        $.post('../controlador/UsuarioController.php', { consulta, funcion }, (Response) => {
            const usuarios = JSON.parse(Response);
            let template = '';
            usuarios.forEach(usuario => {
                template += `
                <div usuarioId="${usuario.id}" class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                    <div class="card bg-light">
                        <div class="card-header text-muted border-bottom-0">
                            ${usuario.tipo}
                        </div>
                        <div class="card-body pt-0">
                            <div class="row">
                                <div class="col-7">
                                    <h2 class="lead"><b>${usuario.nombre} ${usuario.apellidos}</b></h2>
                                    <p class="text-muted text-sm"><b>Sobre mí:</b> ${usuario.adicional}</p>
                                    <ul class="ml-4 mb-0 fa-ul text-muted">
                                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-id-card"></i></span>DNI: ${usuario.dni}</li>
                                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-birthday-cake"></i></span>Edad: ${usuario.edad}</li>
                                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Residencia: ${usuario.residencia}</li>
                                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span>Teléfono: ${usuario.telefono}</li>
                                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-at"></i></span>Correo: ${usuario.correo}</li>
                                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-smile-wink"></i></span>Sexo: ${usuario.sexo}</li>
                                    </ul>
                                </div>
                                <div class="col-5 text-center">
                                    <img src="${usuario.avatar}" alt="" class="img-circle img-fluid">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="text-right">`;   
                        if (tipo_usuario == 3 && usuario.tipo_usuario != 3) {
                            if(usuario.tipo_usuario!=3){
                                template += `
                                <button class="borrar-usuario btn btn-danger mr-1" type="button" data-toggle="modal" data-target="#confirmar">
                                    <i class="fas fa-window-close mr-1"></i> Eliminar
                                </button>`;
                            }
                            if (usuario.tipo_usuario==2){
                                template += `
                                <button class="ascender btn btn-primary mr-1" type="button" data-toggle="modal" data-target="#confirmar">
                                    <i class="fas fa-sort-amount-up  mr-1"></i> Ascender
                                </button>`;
                            }
                            if(usuario.tipo_usuario==1){
                                template += `
                                <button class="descender btn btn-secondary mr-1" type="button" data-toggle="modal" data-target="#confirmar">
                                    <i class="fas fa-sort-amount-down mr-1"></i> Descender
                                </button>`;
                            }
                        }
                        else{
                            if(tipo_usuario == 1 && usuario.tipo_usuario!=1 && usuario.tipo_usuario!=3){
                                template += `
                                <button class="borrar-usuario btn btn-danger mr-1" type="button" data-toggle="modal" data-target="#confirmar">
                                    <i class="fas fa-window-close mr-1"></i> Eliminar
                                </button>`;
                            }
                        }
                template += `
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
            $('#usuarios').html(template);
        });
    }
    $(document).on('keyup', '#buscar', function(){
        let valor =$(this).val();
        if(valor!=""){
            buscar_datos(valor);
        }
        else{
            buscar_datos();
        }
    });
    
    $('#form-crear').submit(e=>{
        let nombre =$('#nombre_us').val();
        let apellido =$('#apellido_us').val();
        let edad=$('#edad').val();
        let dni =$('#dni_us').val();
        let pass =$('#pass').val();
        funcion='crear_usuario';
        $.post('../controlador/UsuarioController.php',{nombre, apellido, edad, dni, pass, funcion},(Response)=>{
            if(Response== 'add'){
                $('#add').hide('slow');
                $('#add').show(1000);
                $('#add').hide(2000);
                $('#form-crear').trigger('reset');
                buscar_datos();
            }
            else{
                $('#noadd').hide('slow');
                $('#noadd').show(1000);
                $('#noadd').hide(2000);
                $('#form-crear').trigger('reset');

            }
        });
        e.preventDefault();
    });
    $(document).on('click','.ascender', (e)=>{
        const elemento= $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id=$(elemento).attr('usuarioId');
        funcion='ascender';
        $('#id_user').val(id);
        $('#funcion').val(funcion);
    });
    $(document).on('click','.descender', (e)=>{
        const elemento= $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id=$(elemento).attr('usuarioId');
        funcion='descender';
        $('#id_user').val(id);
        $('#funcion').val(funcion);
    });
    $(document).on('click','.borrar-usuario', (e)=>{
        const elemento= $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id=$(elemento).attr('usuarioId');
        funcion='borrar_usuario';
        $('#id_user').val(id);
        $('#funcion').val(funcion);
    });
    /*$('#form-confirmar').submit(e=>{
        let pass=$('#oldpass').val();
        let id_usuario=$('#id_user').val();
        funcion=$('#funcion').val();
        $.post('../controlador/UsuarioController.php', {pass, id_usuario, funcion},(Response)=>{
          if(Response=='ascendido'||Response=='descendido'||Response=='borrado'){
            $('#confirmado').hide('slow');
            $('#confirmado').show(1000);
            $('#confirmado').hide(2000);
            $('#form-confirmar').trigger('reset');
          }
          else{
            $('#rechazado').hide('slow');
            $('#rechazdo').show(1000);
            $('#rechazado').hide(2000);
            $('#form-confirmar').trigger('reset');
          }
            buscar_datos();

        }); 
        e.preventDefault();
    });*/

    $(document).ready(function() {
        // Al abrir el modal, asigna el id_usuario al campo oculto
        $('.btn-eliminar').on('click', function() {
            let id_usuario = $(this).data('id'); // Supone que el botón tiene el id del usuario en data-id
            $('#id_user').val(id_usuario);
            $('#confirmar').modal('show');
        });
    
        // Acción al confirmar la eliminación
        $('#btn-confirmar-eliminacion').on('click', function() {
            let id_usuario = $('#id_user').val();
            let funcion = 'borrar_usuario';
    
            // Enviar solicitud de eliminación al controlador
            $.post('../controlador/UsuarioController.php', { id_usuario, funcion }, (Response) => {
                console.log(Response); // Útil para depuración
                if (Response == 'borrado') {
                    $('#confirmado').show(1000).delay(2000).fadeOut();
                    setTimeout(() => location.reload(), 3000); // Recarga la página después de la confirmación
                } else {
                    $('#rechazado').show(1000).delay(2000).fadeOut();
                }
            });
        });
    });
})