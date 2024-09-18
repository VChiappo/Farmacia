<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" type="text/css" href="../css/css/all.min.css">
</head>
<body>
   <img class="wave" src="../img/wave.png" alt="">
   <div class="contenedor">
        <div class="img">
            <img src="../img/undraw_medicine_b-1-ol.svg" alt="">
        </div>
        <div class="contenido-login">
            <form action="">
                <img src="../img/logo.png" alt="">
                <h2>FARMACIA</h2>
                <div class="input-div dni">
                    <div class=i>
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="div">
                      <h5>DNI</h5>
                      <input type="text" name="user" class="input">  
                    </div>
                </div>
                <div class="input-div pass">
                    <div class=i>
                        <i class="fas fa-lock"></i>
                    </div>
                    <div class="div">
                      <h5>CONTRASEÑA</h5>
                      <input type="password" name="pass" class="input">  
                    </div>
                </div>
                <a href="">Created Warpiece</a>
                <input type="submit" class="btn" value="Iniciar sesion">
            </form>
        </div>
   </div>
   <script src="../js/login.js"></script>
</body>
</html>