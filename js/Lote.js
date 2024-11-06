$(document).ready(function () {
    var funcion;
   
    buscar_lote();
    function buscar_lote(consulta) {
        funcion = "buscar";
        $.post('../controlador/LoteController.php', { consulta, funcion }, (response) => {
            const lotes = JSON.parse(response);
            let template = '';
            lotes.forEach(lote => {
                template += `
                <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">`;
                if(lote.estado=='light'){
                    template += `<div class="card bg-light">`;
                }
                if(lote.estado=='danger'){
                    template += `<div class="card bg-danger">`;
                }
                if(lote.estado=='warning'){
                    template += `<div class="card bg-warning">`;
                }
                    template += `<div class="card-header border-bottom-0"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                        <i class="fas fa-lg fa-cubes mr-1"></i>${lote.stock}
                        </font></font>
                    </div>
                    <div class="card-body pt-0">
                    <div class="row">
                        <div class="col-7">
                        <h2 class="lead"><b>${lote.nombre}</b></h2>
                       
                        <ul class="ml-4 mb-0 fa-ul">
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-mortar-pestle"></i></span> Concentracion: ${lote.concentracion}</li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-prescription-bottle-alt"></i></span> Adicional: ${lote.adicional}</li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-flask"></i></span> Laboratorio: ${lote.laboratorio}</li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-copyright"></i></span> Tipo: ${lote.tipo}</li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-pills"></i></span> Presentación: ${lote.presentacion}</li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar-times"></i></span> Vencimiento: ${lote.vencimiento}</li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-truck"></i></span> Proveedor: ${lote.proveedor}</li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar-alt"></i></span> Mes: ${lote.mes}</li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-calendar-day"></i></span> Día: ${lote.dia}</li>
                        </ul>
                        </div>
                        <div class="col-5 text-center">
                        <img src="${lote.avatar}" alt="" class="img-circle img-fluid">
                        </div>
                    </div>
                    </div>
                    <div class="card-footer">
                    <div class="text-right">
                       
                        <button class="editar btn btn-sm btn-success" type= "button" data-toggle="modal" data-target="#crearlote" >
                        <i class="fas fa-pencil-alt"></i>
                        </button>
                        
                        <button class="borrar btn btn-sm btn-danger">
                        <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            `;
            });
            $('#lotes').html(template);
        });
    }
    $(document).on('keyup', '#buscar-lote', function () {
        let valor = $(this).val();
        if (valor != "") {
            buscar_lote(valor);
        }
        else {
            buscar_lote();
        }
    });
   
}) 