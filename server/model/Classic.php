<?php

    require_once ("ModelBase.php");
    
    class Classic extends ModelBase{

        function __construct(){
            
            $this->table_name = 'classics';

            parent :: __construct();
        }
    }
?>