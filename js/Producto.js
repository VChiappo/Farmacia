$(document).ready(function(){
    $('.select2').select2();
    var funcion;
    function rellenar_laboratorios(laboratorios) {
        funcion = rellenar_laboratorios
        $.post('../controlador/LaboratorioController.php',(funcion),(response)=>{
            console.log(response );
        })
        
    }
})