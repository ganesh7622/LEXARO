<?php
// Get form data
$n = $_POST['name'];
$e = $_POST['email'];
$m = $_POST['message'];

// Connect to database
$con = mysqli_connect("localhost", "root", "", "lexaro");

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Insert query
$sql = "INSERT INTO client_details (client_name, client_email, client_message) 
        VALUES ('$n', '$e', '$m')";

// Execute query
$r = mysqli_query($con, $sql);

if ($r) {
    echo "Data added successfully";
} else {
    echo "Data not added: " . mysqli_error($con);
}

// Close connection
mysqli_close($con);
?>
