<?php

    require_once (__DIR__."/../controller/Controller.php");
    
    if (isset($_POST['isbn']) && isset($_POST['title']) && isset($_POST['author']) && isset($_POST['category']) && isset($_POST['year'])){

        //Si se reciben todos los datos se creara el objeto Classic
        $newClassic['isbn']     = $_POST['isbn'];
        $newClassic['title']    = $_POST['title'];
        $newClassic['author']   = $_POST['author'];
        $newClassic['category'] = $_POST['category'];
        $newClassic['year']     = $_POST['year'];

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