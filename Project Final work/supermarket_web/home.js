document.addEventListener("DOMContentLoaded", function () {
  // Check for the user type
  var admin_products_pg = document.getElementById("admin_products_pg");
  let user = localStorage.getItem("user");
  user_details = JSON.parse(user);

  if (user_details.user_type !== "admin") {
    admin_products_pg.style.display = "none";
  } else {
    admin_products_pg.style.display = "block";
  }

  // Get details about other pages to home page JS
  var admin_products_pg = document.getElementById("admin_products_pg");
  // let user = localStorage.getItem("user"); //line 4 already took user details
  user_details = JSON.parse(user);

  var all_products_pg = document.getElementById("all_products_pg");
  var logIn_Btn_p = document.getElementById("logIn_Btn_p");
  var logout_Btn_p = document.getElementById("logout_Btn_p");
  var cart_img = document.getElementById("cart_img");
  debugger;
  // Look for user details and show the pages
  if (user_details && user_details.email) {
    all_products_pg.style.display = "block";
    logIn_Btn_p.style.display = "none";
    //logout_Btn_p.style.display = "block"; // For some reason the logout button worked when i commented this line
    cart_img.style.display = "block";

    if (user_details.user_type !== "admin") {
      admin_products_pg.style.display = "none";
    } else {
      admin_products_pg.style.display = "block";
    }

    // LogOut Btn
    let logout_Btn = document.getElementById("logout_Btn");
    logout_Btn.addEventListener("click", function () {
      onClickLogOut();
    });
  } else {
    admin_products_pg.style.display = "none";
    all_products_pg.style.display = "none";
    logIn_Btn_p.style.display = "block";
    logout_Btn_p.style.display = "none";
    cart_img.style.display = "none";
  }

  // LogIn Btn
  const login_btn = document.getElementById("logIn_Btn");
  login_btn.addEventListener("click", function () {
    onClickLogin();
  });
});

// Login Function
function onClickLogin() {
  window.location.href = "login.html";
}

// onClickLogOut funtion
function onClickLogOut() {
  localStorage.clear();
  window.location.href = "login.html";
}

// slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Function to get product list
function getProductList(category, searchVal = " ") {
  fetch(
    `http://localhost/supermarket_web/index.php?cat=${category}&search=${searchVal}`
  )
    .then((response) => response.json())
    .then((products) => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";
      products.forEach((product) => {
        // Create new div tag
        const productDiv = document.createElement("div");
        // Set class for the new div
        productDiv.classList.add("product");

        // Create new image tag
        const productImage = document.createElement("img");
        // Set image source
        productImage.src = product.imageUrl;
        productImage.classList.add("product_img");
        // Store product ID in a data attribute
        productImage.dataset.id = product.id;
        // Add image tag to the productDiv
        productDiv.appendChild(productImage);

        // Create new H2 tag to display the product name
        const productName = document.createElement("h2");
        productName.textContent = product.name;
        // Add Name tag to the productDiv
        productName.classList.add("product_name");
        productDiv.appendChild(productName);

        // Create new p tag to display the product price
        const productPrice = document.createElement("p");
        productPrice.textContent = `Rs.${product.price}`;
        // Add Price tag to the productDiv
        productPrice.classList.add("product_price");
        productDiv.appendChild(productPrice);

        // Create new p tag to display the product weight
        const productWeight = document.createElement("p");
        productWeight.textContent = `${product.weight}`;
        productWeight.classList.add("product_wegiht");
        productDiv.appendChild(productWeight);

        // Create Add to cart button
        // const productButton = document.createElement("button");
        // productButton.textContent = "Add to Cart";
        // // Add class to style the button
        // productButton.classList.add("add_to_cart_btn");
        // // Add button to the productDiv
        // productDiv.appendChild(productButton);

        // Append the productDiv to the product list container
        productList.appendChild(productDiv);

        // Add click event listener to the product image
        // productImage.addEventListener("click", function () {
        //   const productId = productImage.dataset.id;
        //   console.log(`Fetching details for product ID: ${productId}`);
        //   getSingleProduct(productId);
        // });

        // // Add click event listener to the Add to Cart Btn
        // productButton.addEventListener("click", function () {
        //   addToCartByProdList(product);
        // });
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

// Fetch and display Best Selling products when the page loads
document.addEventListener("DOMContentLoaded", function () {
  getProductList("BSEL");
});

// // Additional function to get a single product's details
// function getSingleProduct(productId) {
//   fetch(`http://localhost/supermarket_web/index.php?id=${productId}`)
//     .then((response) => response.json())
//     .then((product) => {
//       console.log(product);
//       // Handle displaying the single product details
//     })
//     .catch((error) => console.error("Error fetching product details:", error));
// }

// // Additional function to add a product to the cart
// function addToCartByProdList(product) {
//   console.log("Adding to cart:", product);
//   // Handle adding product to the cart
// }
