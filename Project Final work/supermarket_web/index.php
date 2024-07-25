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
        if (isset($_GET['id'])) {
            // Fetch a single product
            $id = intval($_GET['id']);
            $get_sql = "SELECT * FROM products WHERE id = $id";
            $result = $conn->query($get_sql);
            if ($result) {
                $product = $result->fetch_assoc();
                if ($product) {
                    echo json_encode($product);
                } else {
                    echo json_encode(['error' => 'Product not found']);
                }
            } else {
                echo json_encode(['error' => 'Query error: ' . $conn->error]);
            }
        } else {

            // Get results by selected cat
            $cat = $_GET['cat'];
            $search = $_GET['search'];
            $get_sql = "";

            if ($cat === "ALL") {
                // Fetch all products
                $get_sql = "SELECT * FROM products WHERE name LIKE '%" . $search . "%' ORDER BY id DESC"; // Specify a column for ORDER BY
            }
            //Fetch Products from meat category
            elseif ($cat === "MET") {
                $get_sql = "SELECT p.id, p.name, p.price, p.weight, p.imageUrl, p.category_id FROM products as p INNER JOIN category as c ON c.id = p.category_id WHERE c.code = 'MET' AND p.name LIKE '%" . $search . "%' ";
            }
            //Fetch Products from Fruits category
            else if ($cat === "FRT") {
                $get_sql = "SELECT p.id, p.name, p.price, p.weight, p.imageUrl, p.category_id FROM products as p INNER JOIN category as c ON c.id = p.category_id WHERE c.code = 'FRT' AND p.name LIKE '%" . $search . "%' ";
            }
            //Fetch Products from Vegtables category
            else if ($cat === "VEG") {
                $get_sql = "SELECT p.id, p.name, p.price, p.weight, p.imageUrl, p.category_id FROM products as p INNER JOIN category as c ON c.id = p.category_id WHERE c.code = 'VEG' AND p.name LIKE '%" . $search . "%' ";
            }
            //Fetch Products from Grocery category
            else if ($cat === "GRY") {
                $get_sql = "SELECT p.id, p.name, p.price, p.weight, p.imageUrl, p.category_id FROM products as p INNER JOIN category as c ON c.id = p.category_id WHERE c.code = 'GRY' AND p.name LIKE '%" . $search . "%' ";
            }
            //Fetch Products from Snacks category
            else if ($cat === "SNK") {
                $get_sql = "SELECT p.id, p.name, p.price, p.weight, p.imageUrl, p.category_id FROM products as p INNER JOIN category as c ON c.id = p.category_id WHERE c.code = 'SNK' AND p.name LIKE '%" . $search . "%' ";
            }
            //Fetch Products from Best selling category
            else if ($cat === "BSEL") {
                $get_sql = "SELECT p.id, p.name, p.price, p.weight, p.imageUrl, p.category_id FROM products as p INNER JOIN category as c ON c.id = p.category_id WHERE c.code = 'BSEL' AND p.name LIKE '%" . $search . "%' ";
            }



            $result = $conn->query($get_sql);
            if ($result) {
                $products = [];
                while ($row = $result->fetch_assoc()) {
                    $products[] = $row;
                }
                echo json_encode($products);
            } else {
                echo json_encode(['error' => 'Query error: ' . $conn->error]);
            }
        }
        break;

    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}
//jj u online?