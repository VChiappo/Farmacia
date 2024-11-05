$(document).ready(function(){
    var funcion;
    buscar_prov();

    $('#form-crear').submit(e => {
        e.preventDefault();
        let nombre = $('#nombre').val();
        let telefono = $('#telefono').val();
        let correo = $('#correo').val();
        let direccion = $('#direccion').val();
        funcion ='crear';
        $.post('../controlador/ProveedorController.php',{funcion, nombre, telefono, correo, direccion },(response) =>{
           if(response=="add"){
            $('#add-prov').hide('slow');
            $('#add-prov').show(1000);
            $('#add-prov').hide(2000);
            $('#form-crear').trigger('reset');

           }
           if(response=="noadd"){
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
            console.log(response);
    });
}

$(document).on('keyup','#buscar_proveedor',function(){
    let valor = $(this).val();
        if (valor != ''){
            buscar_prov(valor);
        }
        else {
            buscar_prov();
        }

});

});