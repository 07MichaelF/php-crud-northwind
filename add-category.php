<?php
    include('connections/connection-db.php');

    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $descr = $_POST['description'];
        $query = "INSERT INTO categories(CategoryName, Description) VALUES ('$name', '$descr')";
        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Query Failed.'. mysqli_error($connection));
        }
        echo 'Category Added Successfully';
    }

?>