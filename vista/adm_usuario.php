<?php
session_start();
if($_SESSION['us_tipo']==1){
  include_once "layouts/header.php";
?>

  <title>Adm | Editar Datos</title>
  <!-- Tell the browser to be responsive to screen width -->
  <?php
  include_once "layouts/nav.php";
 ?>
    <div class="modal fade" id="crearusuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
             <div class="modal-content">
                <div class="card card-success">
                    <div class="card-header">
                        <h3 class="card-title">Crear usuario</h3>
                        <button data-dismiss="modal"aria-label="close" class="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <form id="form-crear">
                            <div class="form-group">
                                    <label for="nombre">Nombres</label>
                                    <input id="nombre" type="text" class="form-control" placeholder="Ingrese nombre" required>
                            </div>
                            <div class="form-group">
                                    <label for="apellido">Apellido</label>
                                    <input id="apellido" type="text" class="form-control" placeholder="Ingrese apellido" required>
                            </div>
                            <div class="form-group">
                                    <label for="edad">Nacimiento</label>
                                    <input id="edad" type="date" class="form-control" placeholder="Ingrese su fecha de nacimiento" required>
                            </div>
                            <div class="form-group">
                                    <label for="dni">DNI</label>
                                    <input id="dni" type="text" class="form-control" placeholder="Ingrese su DNI" required>
                            </div>
                            <div class="form-group">
                                    <label for="pass">Password</label>
                                    <input id="pass" type="Password" class="form-control" placeholder="Ingrese password" required>
                            </div>
                    </div>
                    <div class="card-footer">
                        <button type="sumit" class="btn bg-gradient-primary float-right m-1">Guardar</button>
                        <button type="button" data-dismiss="modal" class="button btn btn-outline-secondary float-right m-1">Cerrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Gestion usuarios  <button type="button" data-toggle="modal" data-target="#crearusuario"class="btn bg-gradient-primary ml-2">Crear usuario</button></h1>
            
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="adm_catalogo.php">Home</a></li>
              <li class="breadcrumb-item active">Gestion usuarios</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
   <section>
    <div class="container-fluid">
        <div class="card card-success">
            <div class="card-header">
                <h3 class="card-tittle">Buscar usuario</h3>
                <div class="input-group">
                    <input type="text" id="buscar" class="form-control float-left" placeholder="Ingrese nombre de usuario">
                    <div class="input-group-append">
                        <button class="btn btn-default"><i class="fas fa-search"></i></button>
                    </div>
                </div>
            </div>
            <div class="card-body">

            </div>
            <div class="card-footer">

            </div>
        </div>
    </div>
   </section>
  </div>
  <!-- /.content-wrapper -->   
<?php
include_once "layouts/footer.php";
}
else{
    header('Location: ../index.php');
}
?>
<script src="../js/usuario.js"></script>
<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
 