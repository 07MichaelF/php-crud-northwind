<?php
    include('connections/connection-db.php');
    
    $search = $_POST['search'];
    if(!empty($search)){
        $query = "SELECT * FROM categories WHERE CategoryName LIKE '$search%'";
        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Query Error'. mysqli_error($connection));
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
    }

?>