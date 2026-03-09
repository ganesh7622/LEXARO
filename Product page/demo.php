<?php
if(isset($_POST['submit'])){

    $n = $_POST['name'];
    $e = $_POST['email'];
    $a = $_POST['address'];
    $c = $_POST['city'];
    $z = $_POST['number'];
    $m = $_POST['modelname'];
    $q = $_POST['quantity'];

    $connect = mysqli_connect("localhost","root","","lexaro_1");

    if(!$connect){
        die("Database connection failed");
    }

    $sql = "INSERT INTO shipping_details
            (client_name, client_email, client_address, client_city, zip_code, modelname, quantity)
            VALUES ('$n','$e','$a','$c','$z','$m','$q')";

    $v = mysqli_query($connect,$sql);

    if($v){
        echo "<script>alert('Data submitted successfully');</script>";
    } else {
        echo "Error: " . mysqli_error($connect);
    }
}
?>
