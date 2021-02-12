<?php
    include('connections/connection-db.php');

    if(isset($_POST['id'])) {
      $id = mysqli_real_escape_string($connection, $_POST['id']);
    
      $query = "SELECT * from categories WHERE CategoryID = {$id}";
    
      $result = mysqli_query($connection, $query);
      if(!$result) {    
            die('Query Failed'. mysqli_error($connection));
      }
    
      $json = array();
      while($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'Id' => $row['CategoryID'],
            'Name' => $row['CategoryName'],
            'Description' => $row['Description']         
        );
      }
      $jsonstring = json_encode($json[0]);
      echo $jsonstring;
    }
?>