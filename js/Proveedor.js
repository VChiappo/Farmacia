$(document).ready(function () {
    var funcion;
    buscar_prov();

    $('#form-crear').submit(e => {
        e.preventDefault();
        let nombre = $('#nombre').val();
        let telefono = $('#telefono').val();
        let correo = $('#correo').val();
        let direccion = $('#direccion').val();
        funcion = 'crear';
        $.post('../controlador/ProveedorController.php', { funcion, nombre, telefono, correo, direccion }, (response) => {
            if (response == "add") {
                $('#add-prov').hide('slow');
                $('#add-prov').show(1000);
                $('#add-prov').hide(2000);
                $('#form-crear').trigger('reset');

            }
            if (response == "noadd") {
                $('#noadd-prov').hide('slow');
                $('#noadd-prov').show(1000);
                $('#noadd-prov').hide(2000);
                $('#form-crear').trigger('reset');


            }
        });
    });
    function buscar_prov(consulta) {
        funcion = 'buscar';
        $.post('../controlador/ProveedorController.php', { consulta, funcion }, (response) => {
            const proveedores = JSON.parse(response);
            let template = '';
            proveedores.forEach(proveedor => {
                template += `
                <div provId="${proveedor.id}"provNombre="${proveedor.nombre}" provTelefono="${proveedor.telefono}"provCorreo="${proveedor.correo}" provDireccion="${proveedor.direccion}" provAvatar="${proveedor.avatar}"class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
              <div class="card bg-light">
                <div class="card-header text-muted border-bottom-0"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                 <h1 class='badge badge-success'>Proveedor</h1>
                </font></font></div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">"${proveedor.nombre}"</font></font></b></h2>
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Dirección: "${proveedor.direccion}"</font></font></li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Teléfono: "${proveedor.telefono}"</font></font></li>
                         <li class="small"><span class="fa-li"><i class="fas fa-lg fa-at"></i></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Correo: "${proveedor.correo}"</font></font></li>
    
                        </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img src="${proveedor.avatar}" alt="" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <button class="avatar btn btn-sm btn-info" title="Editar logo" type="button" data-toggle="modal" data-target="#cambiologo">
                      <i class="fas fa-image"></i>
                    </button>
                     <button class="editar btn btn-sm btn-success" title="Editar proveedor">
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                     <button class="borrar btn btn-sm btn-danger" title="Eliminar proveedor">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
                `;
            });
            $('#proveedores').html(template);
        });
    }

    $(document).on('keyup', '#buscar_proveedor', function () {
        let valor = $(this).val();
        if (valor != '') {
            buscar_prov(valor);
        }
        else {
            buscar_prov();
        }

    });

    /* $(document).on('click', '.avatar', (e)=>{
         funcion="cambiar_logo";
         const elemento =$(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
         const  id = $(elemento).attr('provId');
         console.log(id);
         /*const nombre = $(elemento).attr('provNombre');
         const avatar = $(elemento).attr('provAvatar');
         $('#logoactual').attr('src', avatar);
         $('#nombre_logo').html(nombre);
         $('#id_logo_prov').val(id);
         $('#funcion').val(funcion);
     });*/

    $(document).on('click', '.avatar', (e) => {
        funcion = "cambiar_logo";
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('provId');
        const nombre = $(elemento).attr('provNombre');
        const avatar = $(elemento).attr('provAvatar');
        // console.log(id, nombre, avatar); // para verificar que los valores sean correctos
        $('#logoactual').attr('src', avatar);
        $('#nombre_logo').html(nombre);
        $('#id_logo_prov').val(id);
        $('#funcion').val(funcion);
        $('#avatar').val(avatar);
    });

    $('#form-logo').submit(e => {
        let formData = new FormData($('#form-logo')[0]);
        $.ajax({
            url: '../controlador/ProveedorController.php',
            type: 'POST',
            data: formData,
            cache: false,
            processData: false,
            contentType: false
        }).done(function (response) {
            const json = JSON.parse(response);
            if (json.alert == 'edit') {
                $('#logoactual').attr('src', json.ruta);
                $('#edit-prov').hide('slow');
                $('#edit-prov').show(1000);
                $('#edit-prov').hide(2000);
                $('#form-logo').trigger('reset');
                buscar_prov();
            }
            else {
                $('#noedit-prov').hide('slow');
                $('#noedit-prov').show(1000);
                $('#noedit-prov').hide(2000);
                $('#form-logo').trigger('reset');
            }
        });
        e.preventDefault();
    });

    $(document).on("click", ".borrar", (e) => {
        funcion = "borrar";
        const elemento = $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr("provId");
        const nombre = $(elemento).attr("provNombre");
        const avatar = $(elemento).attr("provAvatar");
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger mr-2"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: '¿Estas seguro de eliminar a este proveedor ' + nombre + '?',
            //text: "Esta eliminación es irreversible!",
            //icon: "warning",
            imageUrl: '' + avatar + '',
            imageWitdh: 100,
            imageHeight: 100,
            showCancelButton: true,
            confirmButtonText: "Si, estoy seguro!",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                $.post('../controlador/ProveedorController.php', { id, funcion }, (response) => {
                    if (response == 'borrado') {
                        swalWithBootstrapButtons.fire(
                            "Eliminado!",
                            'El proveedor ' + nombre + ',  fue eliminado con exito!',
                            "success")
                        buscar_prov();
                    }
                    else (
                        "Este proveedor no se puede eliminar!",
                        'El proveedor ' + nombre + ', NO fue eliminado porque está siendo usado en un lote!',
                        "error"
                    )
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado.",
                    text: 'El proveedor ' + nombre + ', no fue eliminado!',
                    icon: "error"
                })
            }
        })
    })
});