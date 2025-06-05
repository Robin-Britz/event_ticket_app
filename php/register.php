<?php
require_once "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']); // remove whitespace from the username from the username register.html submission
    $password = $_POST['password'];

    

}
?>