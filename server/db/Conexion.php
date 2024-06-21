<?php

    require_once ("login_data.php");

    class Conexion{
        
        private static $_singleton = null;
        private $dbh;
        private $errno;
        private $num_rows;

        public static function getInstance(){
            
            if (is_null(self :: $_singleton)){

                self :: $_singleton = new self();
            }

            return self :: $_singleton;
        }

        private function __clone(){

            trigger_error('La clonación de este objeto no esta permitida', E_USER_ERROR);
        }
        
        private function __wakeup(){

            trigger_error("No puede deserializar una instancia de " . get_class($this));
        }
        
        private function __construct(){
            
            global $cfg;

            $db     = $cfg['nombre_bd'];
            $host   = $cfg['servidor'];
            $user   = $cfg['usuario'];
            $pass   = $cfg['password'];
            
            $this->dbh = pg_connect("host=$host user=$user password=$pass dbname=$db");
        }

        public function getConnection(){

            return self :: $_singleton;
        }

        public function close(){

            self :: $_singleton->close();
        }

        protected function query($sql){

            $result = pg_query($this->dbh, $sql);

            return $result;
        }
    }
?>