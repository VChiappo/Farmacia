<?php
session_start();
if ($_SESSION['us_tipo'] == 3) {
  include_once "layouts/header.php";
?>
  <title>Adm | Gestión Lote</title>

  <?php include_once "layouts/nav.php"; ?>

  <!-- Content Wrapper -->
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Gestión lote </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="adm_catalogo.php">Home</a></li>
              <li class="breadcrumb-item active">Gestión lote</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container-fluid">
        <div class="card card-success">
          <div class="card-header">
            <h3 class="card-title">Buscar lotes</h3>
            <div class="input-group">
              <input type="text" id="buscar-lote" class="form-control float-left" placeholder="Ingrese nombre de producto">
              <div class="input-group-append">
                <button class="btn btn-default"><i class="fas fa-search"></i></button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div id="lotes" class="row d-flex align-items-stretch"></div>
          </div>
          <div class="card-footer"></div>
        </div>
      </div>
    </section>
  </div>

  <?php
  include_once "layouts/footer.php";
} else {
  header('Location: ../index.php');
}
?>

<!-- Scripts -->
<script src="../js/Lote.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
