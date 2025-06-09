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
    $pass = password_hash($_POST['password'], PASSWORD_BCRYPT);

    // Check if the username or email already exists
    $checkStmt = $conn->prepare("SELECT * FROM users WHERE Username = ?");
    $checkStmt->bind_param("s", $user);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        header("Location: ../register_error.html"); // Redirect back to HTML
        exit();
    } else {
        // Proceed with registration
        $stmt = $conn->prepare("INSERT INTO users (Username, Password) VALUES (?, ?)");
        $stmt->bind_param("ss", $user, $pass);

        if ($stmt->execute()) {
            header("Location: ../register_success.html"); // Redirect back to HTML
            exit();
        } else {
            header("Location: ../register_error.html"); // Redirect back to HTML
        }
        $stmt->close();
    }

    $checkStmt->close();
    $conn->close();
}
?>