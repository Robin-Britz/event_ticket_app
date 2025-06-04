<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["username"];
        $password = $_POST["password"];
        $password = password_hash($password, PASSWORD_BCRYPT);
        echo "<h2>Welcome $username, your password is $password</h2>";
    }
?>