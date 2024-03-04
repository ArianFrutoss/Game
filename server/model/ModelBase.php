<?php

    require_once (__DIR__."/../db/Conexion.php");

    class ModelBase extends Conexion{
        
        protected $conexion;
        protected $table_name;

        function __construct(){
            
            $this->conexion = parent :: getInstance();
        }

        //Obtiene todos los elementos de la tabla
        function getAll(){
            
            $query = $this->selectDB($this->table_name);
            $result = $this->conexion->query($query);
            $array = $this->createArray($result);
            
            return $array;
        }
        
        //Funcion que añade un elemento nuevo a la tabla
        function addNew($array){

            $query = $this->insertDB($this->table_name, $array);
            $result = $this->conexion->query($query);

            return $result;
        }

        //Funcion para crear el array asociativo para devolver los valores
        protected function createArray($data){

            $array = [];

            while ($row = pg_fetch_assoc($data)){

                $array[] = $row;
            }

            return $array;
        }
        
        protected function selectDB($table, $columns = "*", $name = "", $value = ""){
            echo "$value";
            $query = "SELECT $columns FROM $table";

            if ($name != "" && $value != ""){

                $query .= "WHERE $name = '$value'";
            }

            return $query;
        }

        protected function insertDB($table, $array){

            foreach ($array as $name => $value){

                foreach ($array as $name => $value){

                    $insert_name[] = $name;
                    $insert_value[] = $value;
                }

                $query = "INSERT INTO $table(";

                $num_elem = count($insert_name);

                for ($i = 0; $i < $num_elem; $i++){

                    $query .= "$insert_name[$i]";

                    if ($i != $num_elem - 1){

                        $query .= ", ";
                    }

                    else{

                        $query .= ") ";
                    }
                }

                $query .= "VALUES(";

                for ($i = 0; $i < $num_elem; $i++){

                    $query .= "'$insert_value[$i]'";

                    if ($i != $num_elem - 1){

                        $query .= ", ";
                    }

                    else{

                        $query .= ") ";
                    }
                }
                
                return $query;
            }
        }
    }
?>