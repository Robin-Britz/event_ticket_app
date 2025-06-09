<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "event_ticket_app";

// Start connection to database, throw an error if there's an issue
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = $_POST['username'];
    $pass = $_POST['password'];

    $stmt = $conn->prepare("SELECT Password FROM users WHERE Username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // If more than 0 result returns, it means there is a valid user
        $stmt->bind_result($hashedPassword);
        $stmt->fetch();

        if (password_verify($pass, $hashedPassword)) {
            header("Location: ../login_success.html"); // Redirect back to HTML
            exit();
        } else {
            header("Location: ../login_error.html"); // Redirect back to HTML
            exit();
        }
    } else {
        header("Location: ../login_error.html"); // Redirect back to HTML
    }
    $stmt->close();
    $conn->close();
}
?>