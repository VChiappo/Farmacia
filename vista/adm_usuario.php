<?php
session_start();
if($_SESSION['us_tipo']==1||$_SESSION['us_tipo']==3){
  include_once "layouts/header.php";
?>

  <title>Adm | Editar Datos</title>
  <!-- Tell the browser to be responsive to screen width -->
  <?php
  include_once "layouts/nav.php";
 ?>
    <div class="modal fade" id="confirmar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="exampleModalLabel">Confirmar contraseña</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="text-center">
            <img id="avatar3" src="../img/avatar.png" class="profile-user-img img-fluid img-circle">
          </div>
          <div class="text-center">
            <b>
              <?php
                echo $_SESSION['nombre_us'];
              ?>
            </b>
          </div>
          <span>Necesitamos su contraseña para continuar</span>
          <div class="alert alert-success text-center" id="confirmado" style="display: none;">
            <span><i class="fas fa-check m-1"></i>Usuario modificado con exito</span>
          </div>
          <div class="alert alert-danger text-center" id="rechazado" style="display: none;">
            <span><i class="fas fa-times m-1"></i>Contraseña incorrecta</span>
          </div>
          <form id="form-confirmar">
            <div class="input-group mb-3">
              <span class="input-group-text bg-light">
                <i class="fas fa-unlock-alt"></i>
              </span>
              <input id="oldpass" type="password" class="form-control" placeholder="Ingrese contraseña actual" aria-label="Contraseña actual">
              <input type="hidden" id="id_user">
              <input type="hidden" id="funcion">
            </div>
        </div>
          <div class="modal-footer">
            <button type="button" data-dismiss="modal" class="button btn btn-outline-secondary float-right m-1">Cerrar</button>
            <button type="submit" class="btn bg-gradient-primary">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
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
                        <div class="alert alert-success text-center" id="add" style="display: none;">
                          <span><i class="fas fa-check m-1"></i> Usuario agregado con exito</span>
                        </div>
                        <div class="alert alert-danger text-center" id="noadd" style="display: none;">
                          <span><i class="fas fa-times m-1"></i>Este usuario ya existe, por favor verifique el DNI</span>
                        </div>
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
                        <button type="submit" class="btn bg-gradient-primary float-right m-1">Guardar</button>
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
            <h1>Gestion usuarios  <button id="button-crear" type="button" data-toggle="modal" data-target="#crearusuario"class="btn bg-gradient-primary ml-2">Crear usuario</button></h1>
            <input type="hidden" id="tipo_usuario" value="<?php echo $_SESSION['us_tipo']; ?>">
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
                <div id="usuarios" class="row d-flex algin-items-strech">
                </div>
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
<script src="../js/gestion_usuario.js"></script>
<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
 