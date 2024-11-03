$(document).ready(function () {
    buscar_tip();
    var funcion;
    var edit = false;
    
    $('#form-crear-tipo').submit(e => {
        let nombre_tipo = $('#nombre-tipo').val();
        let id_editado = $('#id_editar_tip').val();
        
        if (edit == false) {
            funcion = 'crear';
        } else {
            funcion = 'editar';
        }
        
        $.post('../controlador/TipoController.php', { nombre_tipo, id_editado, funcion }, (response) => {
            if (response == 'add') {
                $('#add-tipo').hide('slow');
                $('#add-tipo').show(1000);
                $('#add-tipo').hide(2000);
                $('#form-crear-tipo').trigger('reset');
                buscar_tip();
            }
            if (response == 'noadd') {
                $('#noadd-tip').hide('slow');
                $('#noadd-tip').show(1000);
                $('#noadd-tip').hide(2000);
                $('#form-crear-tipo').trigger('reset');
            }
            if (response == 'edit') {
                $('#edit-tipo').hide('slow');
                $('#edit-tipo').show(1000);
                $('#edit-tipo').hide(2000);
                $('#form-crear-tipo').trigger('reset');
                buscar_tip();
            }
            edit = false; // Cambié '==' por '=' para asignar correctamente
        });
        
        e.preventDefault();
    });
    
    function buscar_tip(consulta) {
        funcion = 'buscar';
        $.post('../controlador/TipoController.php', { consulta, funcion }, (response) => {
            const tipos = JSON.parse(response);
            let template = '';
            tipos.forEach(tipo => {
                template += `
                    <tr tipId="${tipo.id}" tipnombre="${tipo.nombre}">
                    <td>
                    <button class="editar-tip btn btn-success" title="Editar tipo" type="button" data-toggle="modal" data-target="#creartipo">
                    <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="borrar-tip btn btn-danger" title="Borrar tipo">
                    <i class="fas fa-trash"></i>
                    </button>
                    </td>
                    <td>${tipo.nombre}</td>
                    </tr>
                `;
            });
            $('#tipos').html(template);
        });
    }

    $(document).on('keyup', '#buscar-tipo', function () {
        let valor = $(this).val();
        if (valor != '') {
            buscar_tip(valor);
        } else {
            buscar_tip();
        }
    });
    
    $(document).on("click", ".borrar-tip", (e) => {
        funcion = "borrar";
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr("tipId");
        const nombre = $(elemento).attr("tipnombre");
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger mr-2"
            },
            buttonsStyling: false
        });
        
        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro de eliminar el tipo ' + nombre + '?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, estoy seguro!",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/TipoController.php', { id, funcion }, (response) => {
                    edit = false;
                    if (response == 'borrado') {
                        swalWithBootstrapButtons.fire(
                            "Eliminado!",
                            'El tipo ' + nombre + ' fue eliminado con éxito!',
                            "success"
                        );
                        buscar_tip();
                    } else {
                        swalWithBootstrapButtons.fire(
                            "Error",
                            'El tipo ' + nombre + ' no se pudo eliminar!',
                            "error"
                        );
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: 'El tipo ' + nombre + ' no fue eliminado!',
                    icon: "error"
                });
            }
        });
    });

    $(document).on("click", ".editar-tip", (e) => {
        const elemento = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(elemento).attr("tipId");
        const nombre = $(elemento).attr("tipnombre");
        $('#id_editar_tip').val(id);
        $('#nombre-tipo').val(nombre);
        edit = true;
    });
});
