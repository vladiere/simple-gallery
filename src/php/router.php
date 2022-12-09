<?php 
    session_start();
    require "./backend.php";

    if(isset($_POST['choice'])){
        $back = new backend();
        switch ($_POST['choice']) {
            case 'login':
                echo $back->loginRequest($_POST['loguser'], $_POST['logpass']);
                break;
            case 'view':
                echo $back->displayAccount();
                break;
            case 'register':
                echo $back->registerRequest($_POST['regname'], $_POST['reguser'], $_POST['regpass'], $_POST['regemail'], );
                break;
            case 'changepass':
                echo $back->changePass($_POST['oldpass'], $_POST['newpass']);
                break;
            case 'changeusername':
                echo $back->changeUsername($_POST['newUsername']);
                break;
            case 'displayImage':
                echo $back->getImage();
                break;
            case 'removeImage':
                echo $back->removeImage($_POST['imgid'], $_POST['path']);
                break;
            case 'useProfile':
                echo $back->userProfile($_POST['id'], $_POST['path']);
                break;
            case 'getProfile':
                echo $back->getProfile();
                break;
            case 'resetpassword':
                echo $back->resetPassword($_POST["email"], $_POST["password"]);
                break;
            case 'logout':
                session_unset();
                session_destroy();
                echo "200";
                break;
            default:
                # code...
                break;
        }
    }
    
?>