<?php
    include('connections/connection-db.php');

    $query = "SELECT CategoryID, CategoryName, Description FROM categories";
    $result = mysqli_query($connection, $query);
    if(!$result){
        die('Query Failed.'. mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'Id' => $row['CategoryID'],
            'Name' => $row['CategoryName'],
            'Description'=> $row['Description']
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;


?>