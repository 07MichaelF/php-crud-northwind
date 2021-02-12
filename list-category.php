<?php
    include('connections/connection-db.php');

    $query = "SELECT * FROM categories";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die('Query Failed.'. mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'Id' => $row['categoryID'],
            'Name' => $row['categoryName'],
            'Description'=> $row['description']
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;


?>