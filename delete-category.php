<?php
    include('connections/connection-db.php');
        
    if(isset($_POST['id'])) {
        $id = $_POST['id'];
        $query = "DELETE FROM categories WHERE categoryID = $id"; 
        $result = mysqli_query($connection, $query);
      
        if (!$result) {
          die('Query Failed.');
          
        }
        echo "Task Deleted Successfully";  
    }
        
?>