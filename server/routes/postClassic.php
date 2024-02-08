<?php

    require_once (__DIR__."/../controller/Controller.php");
    
    if (isset($_POST['player_name']) && isset($_POST['score'])){

        //Si se reciben todos los datos se creara el objeto Classic
        $newClassic['player_name']  = $_POST['player_name'];
        $newClassic['score']        = $_POST['score'];

        //Añadimos el nuevo objeto a la base de datos
        $returnValue = $classic->addNew($newClassic);

        if ($returnValue === FALSE){

            echo "Error en la introduccion de nuevo elemento en la base de datos";
        }

        else{

            echo json_encode($newClassic);
        }
    }
    
    else{

        die ("Forbidden");
    }
?>