<?php
    include('connection-db.php');

    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $descr = $_POST['description'];
        $query = "INSERT INTO categories(categoryName, description) VALUES ('$name', '$descr')";
        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Query Failed.');
        }
        echo 'Category Added Successfully';
    }

?>