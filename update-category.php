<?php
    include('connections/connection-db.php');
        
    if(isset($_POST['id'])) {
        $name = $_POST['name']; 
        $descr = $_POST['description'];
        $id = $_POST['id'];
        $query = "UPDATE categories SET CategoryName = '$name', Description = '$descr' WHERE CategoryID = '$id'";
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
            die('Query Failed.'. mysqli_error($connection));
        }
        echo "Task Update Successfully";  
      
      }
        
?>