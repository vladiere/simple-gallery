<?php 
    require "./database.php";

    class backend
    {
        public function registerRequest($fname, $username, $password, $email)
        {
            return self::register($fname, $username, $password, $email);
        }

        public function loginRequest($username, $password)
        {
            return self::login($username, $password);
        }

        public function displayAccount()
        {
            return self::displayName();
        }

        public function changePass($oldPass, $newPass)
        {
            return self::newPassword($oldPass, $newPass);
        }

        public function changeUsername($newUsername)
        {
            return self::updateUsername($newUsername);
        }

        public function uploadImage($image_path)
        {
            return self::uploadImg($image_path);
        }

        public function getImage()
        {
            return self::displayImage();
        }

        public function removeImage($imgID, $path)
        {
            return self::removedImage($imgID, $path);
        }

        public function editImage($imgID, $editPath, $imgRm)
        {
            return self::editedImage($imgID, $editPath, $imgRm);
        }

        public function userProfile($imgID, $imgPATH)
        {
            return self::useProfile($imgID, $imgPATH);
        }

        public function getProfile()
        {
            return self::getMyProfile();
        }

        public function resetPassword($email,$password)
        {
            return self::resetMyPassword($email,$password);
        }

        private function resetMyPassword($email,$password)
        {
            try {
                if (self::getMyEmail($email)) {
                    $db = new database();
                    if ($db->getStatus()) {
                        $stmt = $db->getConn()->prepare(self::resetPasswordQuery());
                        $stmt->execute(array(md5($password), self::getDate(), $email));
                        $res = $stmt->fetch();
                        if (!$res) {
                            $db->closeConnection();
                            return "200";
                        } else {
                            $db->closeConnection();
                            return "404";
                        }
                    } else {
                        return "403";
                    }
                } else {
                    return "403";
                }
            } catch (PDOException $e) {
                return $e;
            }
        }

        private function getMyEmail($email)
        {
            try {
                if ($email != '') {
                    $db = new database();
                    if ($db->getStatus()) {
                        $stmt = $db->getConn()->prepare($this->getEmailQuery());
                        $stmt->execute(array($email));
                        $res = $stmt->fetch();
                        if (!$res) {
                            $db->closeConnection();
                            return true;
                        } else {
                            $db->closeConnection();
                            return false;
                        }
                    } else {
                        return "403";
                    }
                } else {
                    return "403";
                }
            } catch (PDOException $e) {
                return $e;
            }
        }

        private function getMyProfile()
        {
            try {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConn()->prepare($this->getProfileQuery());
                    $stmt->execute(array($this->getUserID()));
                    $res = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($res);
                } else {
                    return "403";
                }
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }

        private function useProfile($imgID, $imgPATH)
        {
            try {
                if ($imgID != '' && $imgPATH != '') {
                    $var = $this->checkUserProfile();
                    if ($var == $this->getUserID()) {
                        $db = new database();
                        if ($db->getStatus()) {
                            $stmt = $db->getConn()->prepare($this->updateProfileQuery());
                            $stmt->execute(array($imgPATH, $this->getDate(), $this->getUserID()));
                            $res = $stmt->fetch();
                            if (!$res) {
                                $db->closeConnection();
                                return "200";
                            } else {
                                return "404";
                            }
                        } else {
                            return "403";
                        } 
                    } else {
                        $db = new database();
                        if ($db->getStatus()) {
                            $stmt = $db->getConn()->prepare($this->insertProfileQuery());
                            $stmt->execute(array($this->getUserID(), $imgPATH, $this->getDate(), $this->getDate()));
                            $res = $stmt->fetch();
                            if (!$res) {
                                $db->closeConnection();
                                return "200";
                            } else {
                                return "404";
                            }
                        } else {
                            return "403";
                        } 
                    }
                } else {
                    return "403";
                }
            } catch (PDOException $e) {
                return $e->getMessage() . " userProfile";
            }
        }

        private function checkUserProfile()
        {
            try {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConn()->prepare($this->checkProfile());
                    $stmt->execute();
                    $flag = null;
                    while($res = $stmt->fetch()){
                        $flag = $res['user_id'];
                    }
                    return $flag;
                } else {
                    return "403";
                }
            } catch (PDOException $e) {
                return $e->getMessage(). " checkProfile";
            }
        }

        private function editedImage($imgID, $editPath, $imgRm)
        {
            try {
                
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }

        private function removedImage($imgID, $path)
        {
            try {
                $db = new database();
                if ($db->getStatus()) {
                    $tmp = explode('/',$path);
                    $newPath = "../".$tmp[2]."/".$tmp[3];
                    $stmt = $db->getConn()->prepare($this->deleteImgQuery());
                    $stmt->execute(array($imgID));
                    $db->closeConnection();
                    if (file_exists($newPath)) {
                        unlink($newPath);
                        return '200';
                    } else {
                        return '404';
                    }
                } else {
                    return '403';
                }
            } catch (PDOException $e) {
                return '501';
            }
        }

        private function uploadImg($image_path)
        {

            try {
                if($image_path != ""){
                    $dbms = new database();
                    if ($dbms->getStatus()) {
                        $stmt = $dbms->getConn()->prepare($this->uploadImgQuery());
                        $stmt->execute(array($this->getUserID(),$image_path, $this->getDate()));
                        $res = $stmt->fetch();
                        if (!$res) {
                            $dbms->closeConnection();
                            return "200";
                        } else {
                            return "404";
                        }
                    } else {
                        return "403";
                    }
                }else{
                    return "403";
                }
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }


        private function updateUsername($newUsername)
        {
            try {
                if ($newUsername != '') {
                    $dbms = new database();
                    if ($dbms->getStatus()) {
                        $stmt = $dbms->getConn()->prepare($this->updateUsernameQuery());
                        $stmt->execute(array($newUsername, $this->getDate(), $this->getUserID()));
                        $res = $stmt->fetch();
                        if (!$res) {
                            $dbms->closeConnection();
                            return "200";
                        } else {
                            return "304";
                        }
                    } else {
                        return "403";
                    }
                } else {
                    return "404";
                }
            } catch (PDOException $e) {
                return "501";
            }
        }

        private function newPassword($oldPass, $newPass)
        {
            try {
                if ($this->changePassword($oldPass, $newPass) == "200") {
                    $dbms = new database();
                    $stmt = $dbms->getConn()->prepare($this->updatePass());
                    $stmt->execute(array(md5($newPass), $this->getDate(), $this->getUserID()));
                    $res2 = $stmt->fetch();
                    if (!$res2) {
                        $dbms->closeConnection();
                        return "200";
                    }
                    else{
                        return "404";
                    }
                } else {
                    return "406";
                }
            } catch (Throwable $e) {
                return $e;
            }
        }

        private function changePassword($oldPass, $newPass)
        {
            try {
                if ($this->checkLogin($oldPass, $newPass)) {
                    $dbms = new database();
                    if ($dbms->getStatus()) {
                        $tempPass = md5($oldPass);
                        $stmt = $dbms->getConn()->prepare($this->getPassQuery());
                        $stmt->execute(array($tempPass));
                        $res = $stmt->fetch();
                        if ($res) {
                            $_SESSION['changepass1'] = $tempPass;   
                            $dbms->closeConnection();
                            return "200";
                        } else {
                            return "404";
                        }
                    } else {
                        return "403";
                    }
                } else {
                    return "403";
                }
            } catch (PDOException $e) {
                return "501";
            }
        }

        private function login($username, $password)
        {
            try {
                if ($this->checkLogin($username, $password)) {
                    $dbms = new database();
                    if ($dbms->getStatus()) {
                        $temp = md5($password);
                        $stmt = $dbms->getConn()->prepare($this->loginQuery());
                        $stmt->execute(array($username, $temp));
                        $res = $stmt->fetch();
                        if ($res) {
                            $_SESSION['loguser'] = $username;
                            $_SESSION['logpass'] = $temp;
                            $dbms->closeConnection();
                            return "200";
                        } else {
                            $dbms->closeConnection();
                            return "404";
                        }
                    } else {
                        return "403";
                    }
                } else {
                    return "403";
                }
            } catch (PDOException $e) {
                return "501";
            }
        }

        private function register($fname, $username, $password, $email)
        {
            try {
                if($this->checkValidity($fname, $username, $password, $email)){
                    $db = new database();
                    if($db->getStatus()){
                        $stmt = $db->getConn()->prepare($this->registerQuery());
                        $stmt->execute(array($fname, $username, md5($password), $email, $this->getDate(), $this->getDate()));
                        $result = $stmt->fetch();
                        if(!$result){
                            $db->closeConnection();
                            return "200";
                        }
                        else{
                            return "404";
                        }
                    }
                    else{
                        
                        return "403";
                    }
                }
                else{
                    return "403";
                }
            }
            catch (PDOException $e) {
                return "501";
            }
        }

        private function displayName()
        {
            try {
                if ($this->checkLogin($_SESSION['loguser'], $_SESSION['logpass'])) {
                    $dbms = new database();
                    if ($dbms->getStatus()) {
                        $stmt = $dbms->getConn()->prepare($this->getAccountsQuery());
                        $stmt->execute(array($this->getUserID()));
                        $res = $stmt->fetchAll();
                        $dbms->closeConnection();
                        return json_encode($res);
                    } else {
                        return "403";
                    }
                } else {
                    return "403";
                }
            } catch (PDOException $e) {
                return "501";
            }
        }

        private function displayImage()
        {
            try {
                if ($this->checkLogin($_SESSION['loguser'], $_SESSION['logpass'])) {
                    $db = new database();
                    if ($db->getStatus()) {
                        $stmt = $db->getConn()->prepare($this->getImageDataQuery());
                        $stmt->execute(array($this->getUserID()));
                        $result = $stmt->fetchAll();
                        return json_encode($result);
                    } else {
                        return "404";
                    }
                } else {
                    return "403";
                }
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }

        private function getUserID()
        {
            try {
                $dbms = new database();
                if ($dbms->getStatus()) {
                    $stmt = $dbms->getConn()->prepare($this->loginQuery());
                    $stmt->execute(array($_SESSION['loguser'], $_SESSION['logpass']));
                    $temp = null;
                    while ($row = $stmt->fetch()) {
                        $temp = $row['id'];
                    }
                    return $temp;
                }
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }

        private function checkLogin($username, $password)
        {
            $flag = false;
            if($username != "" && $password != ""){
                $flag = true;
            }

            return $flag;
        }

        private function checkValidity($fname, $email, $username, $password)
        {
            $flag = false;

            if ($fname != "" && $email != "" && $username != "" && $password != "") {
                $flag = true;
            }

            return $flag;
        }

        private function getImageQuery()
        {
            return "SELECT * FROM `images`";
        }

        private function insertProfileQuery()
        {
            return "INSERT INTO `profile` (`user_id`, `user_profile`, `date_added`, `date_updated`) VALUES (?,?,?,?)";
        }

        private function updateProfileQuery()
        {
            return "UPDATE `profile` SET `user_profile` = ?, `date_updated` = ? WHERE `user_id` = ?";
        }

        private function checkProfile()
        {
            return "SELECT * FROM `profile`";
        }

        private function getProfileQuery()
        {
            return "SELECT * FROM `profile` WHERE `user_id` = ?";
        }
        
        private function uploadImgQuery()
        {
            return "INSERT INTO `images` (`user_id`, `img_path`, `uploaded`) VALUES (?,?,?)";
        }

        private function getAccountsQuery()
        {
            return "SELECT * FROM accounts WHERE id = ?";
        }

        private function updateUsernameQuery()
        {
            return "UPDATE accounts SET `username` = ?, `updated` = ? WHERE `id` = ?";
        }

        private function updatePass()
        {
            return "UPDATE accounts SET `password` = ?, `updated` = ? WHERE `id` = ?";
        }

        private function getPassQuery()
        {
            return "SELECT * FROM accounts WHERE `password` = ?";
        }

        private function loginQuery()
        {
            return "SELECT * FROM accounts WHERE `username` = ? AND `password` = ?";
        }

        private function registerQuery()
        {
            return "INSERT INTO accounts (`fullname`, `username`, `password`, `email`, `created`, `updated`) VALUES (?, ?, ?, ?, ? ,?)";
        }

        private function getImageDataQuery()
        {
            return "SELECT * FROM `images` WHERE `user_id` = ?";
        }

        private function deleteImgQuery()
        {
            return "DELETE FROM `images` WHERE `id` = ?";
        }

        private function getDate()
        {
            return Date('Y/m/d');
        }

        private function getEmailQuery()
        {
            return "SELECT `accounts` WHERE `email` = ?";
        }

        private function resetPasswordQuery()
        {
            return "UPDATE `accounts` SET `password` = ?, `updated` = ? WHERE `email` = ?";
        }
    }


?>