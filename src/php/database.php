<?php 

    class database
    {
        private $host;
        private $username;
        private $password;
        private $dbname;
        private $status;
        private $conn;

        public function __construct()
        {
            $this->host = "localhost";
            $this->username = "root";
            $this->password = "";
            $this->dbname = "korvi";
            
            $this->status = false;

            $this->conn = $this->init();
        }
    
        public function getStatus(){
            return $this->status;
        }
        public function getConn(){
            return $this->conn;
        }
        public function closeConnection(){
            $this->conn = null;
        }

        private function init()
        {
            try {
                $conn = new PDO("mysql:host=$this->host;dbname=".$this->dbname, $this->username, $this->password);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->status = true;
                return $conn;

            } catch (PDOException $e) {
                echo "Connection failure: " . $e->getMessage();
            }
        }

    }

?>