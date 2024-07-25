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
    case 'DELETE':
        // Get the JSON data from the DELETE request
        $data = json_decode(file_get_contents('php://input'), true);

        // Extract the product ID
        $product_id = $data['id'];

        // Prepare and bind for product deletion
        $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
        $stmt->bind_param("i", $product_id);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Product deleted successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
        break;
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
                // Prepare the SQL statement with a parameterized query
                $get_sql = "
                SELECT p.*, c.code AS category_code 
                FROM products p
                INNER JOIN category c ON p.category_id = c.id
                WHERE p.name LIKE '%" . $search . "%'
                ORDER BY p.id DESC
            ";

                // $get_sql = "SELECT * FROM products WHERE name LIKE '%" . $search . "%' ORDER BY id DESC"; // Specify a column for ORDER BY
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
    case 'POST':
        // Get the JSON data from the POST request
        $data = json_decode(file_get_contents('php://input'), true);
        // Fetch the category_id based on the provided category code
        $category_code = $data['Category'];  // Assuming category_id from the form is actually the code
        $stmt = $conn->prepare("SELECT id FROM category WHERE code = ?");
        $stmt->bind_param("s", $category_code);
        $stmt->execute();
        $stmt->bind_result($category_id);
        $stmt->fetch();
        $stmt->close();

        if (!$category_id) {
            echo "Invalid category code";
            $conn->close();
            exit();
        }

        // Prepare and bind (SQL CODE)
        $prod_id = $data['Id'];
        if ($prod_id == 0) {
            $stmt = $conn->prepare("INSERT INTO products (name, price, weight, imageUrl, category_id) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sdsss", $name, $price, $weight, $imageUrl, $category_id);
        } else {
            $stmt = $conn->prepare("UPDATE products SET name = ?, price = ?, weight = ?, imageUrl = ?, category_id = ? WHERE id = ?");
            $stmt->bind_param("sdsssi", $name, $price, $weight, $imageUrl, $category_id, $prod_id);
        }


        // Set parameters and execute
        $name = $data['Name'];
        $price = $data['Price'];
        $weight = $data['Weight'];
        $imageUrl = $data['ImageUrl'];



        if ($stmt->execute()) {
            echo "New product created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();

        break;
    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}
