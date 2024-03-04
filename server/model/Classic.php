<?php

    require_once ("ModelBase.php");
    
    class Classic extends ModelBase{

        function __construct(){
            
            $this->table_name = 'score';

            parent :: __construct();
        }
    }
?>