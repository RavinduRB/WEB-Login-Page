<?php
// Allow CORS policy
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Connect to database
$conn = mysqli_connect("localhost", "Dudu", "1234", "e_supper_db");

header('Content-Type: application/json'); // Indicate that the content type of the response is JSON

// Check connection
if (!$conn) {
    echo 'Connection error: ' . mysqli_connect_error();
}

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

// Handle the request based on the method
switch ($method) {
    case 'GET':

        // Fetch a single product
        $userName = $_GET['userName'];
        $password = $_GET['password'];
        // Prepare the SQL statement
        $get_sql = $conn->prepare("SELECT * FROM user WHERE email = ? AND password = ?");
        $get_sql->bind_param('ss', $userName, $password);

        // Execute the prepared statement
        $get_sql->execute();
        $result = $get_sql->get_result();

        if ($result) {
            $user = $result->fetch_assoc();
            if ($user) {
                echo json_encode($user);
            } else {
                echo json_encode(['error' => 'User not found']);
            }
        } else {
            echo json_encode(['error' => 'Query error: ' . $conn->error]);
        }
        break;
    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}
