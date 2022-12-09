<?php 
    session_start();

    require './backend.php';

    if ($_FILES['file']['name'] != '') {
        $test = explode('.', $_FILES['file']['name']);
        $ext = end($test);
        $name = time() . '.' . $ext;
        $location = '../' . 'uploads/' . $name;
        
        $imgPath = explode("..", $location);
        $tmp = implode('..', $imgPath);
        $newImgPath = "/src" . $imgPath[1];

        if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
            $back = new backend();
            echo $back->uploadImage($newImgPath);
        } else {
            echo "404";
        }
    } else {
        echo "403";
    }

?>