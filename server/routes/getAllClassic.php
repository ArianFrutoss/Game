<?php
    
    require_once (__DIR__."/../controller/Controller.php");
    
    $result = $classic->getAll();

    //Devolvemos el resultado de la base de datos como json
    echo json_encode($result);
?>