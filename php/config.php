<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "event_ticket_app";

// using variables aobve to connecto mysql db
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully" . "<br><br>";

?>