document.addEventListener("DOMContentLoaded", function () {
  var admin_products_pg = document.getElementById("admin_products_pg");
  let user = localStorage.getItem("user");
  user_details = JSON.parse(user);
  if (user_details.user_type !== "admin") {
    admin_products_pg.style.display = "none";
  } else {
    admin_products_pg.style.display = "block";
  }
  getProductList();

  //category element variable
  var categorySelect = document.getElementById("category");
  //change event listner dropdown
  categorySelect.addEventListener("change", function () {
    var selectedValue = this.value;
    handleSelection(selectedValue);
  });
  //search element variable
  var categorySelect = document.getElementById("search_btn");
  //click event listner search btn
  categorySelect.addEventListener("click", function () {
    handleSeachBtnClick();
  });
  // cart
  let cartItems = [];

  let cart = localStorage.getItem("cart");
  cartItems = JSON.parse(cart);
  if (cartItems == null || cartItems.length == 0) {
    cartItems = [];
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // LogOut Btn
  let logout_Btn = document.getElementById("logout_Btn");
  logout_Btn.addEventListener("click", function () {
    onClickLogOut();
  });
});

// onClickLogOut funtion

function onClickLogOut() {
  localStorage.clear();
  window.location.href = "login.html";
}

//get product list on click in search btn
function handleSeachBtnClick() {
  getProductList();
}

//get products list by category
function handleSelection() {
  getProductList();
}

//Get single product data
function getSingleProduct(productId) {
  fetch(`http://localhost/supermarket_web/index.php?id=${productId}`)
    .then((response) => response.json())
    .then((product) => {
      console.log("Fetched product details:", product); // Debugging log
      if (product && product.imageUrl) {
        displayProductDetails(product); // shows the prduct
      } else {
        console.error("Product data is invalid:", product);
        alert("Error: Product data is invalid or not found"); // indicates there's an error
      }
    })
    .catch((error) => console.error("Error fetching product details:", error));
}
//Get product list
function getProductList() {
  let searchVal = document.getElementById("search_val").value;
  var selectedValue = document.getElementById("category").value;
  if (searchVal.trim().length == 0) {
    searchVal = " ";
  }
  //Get product list from backend API call start
  fetch(
    `http://localhost/supermarket_web/index.php?cat=${selectedValue}&search=${searchVal}`
  )
    .then((response) => response.json())
    .then((products) => {
      debugger;
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";
      products.forEach((product) => {
        //Create nev div tag
        const productDiv = document.createElement("div");

        // Set class for the new div
        productDiv.classList.add("product");

        //Create new image tag
        const productImage = document.createElement("img");
        //Set image source
        productImage.src = product.imageUrl;
        productImage.classList.add("product_img");
        // Store product ID in a data attribute
        productImage.dataset.id = product.id;
        //Add image tag to the productDiv
        productDiv.appendChild(productImage);

        // create a new H2 tag to display the prodcut name
        const productName = document.createElement("h2");
        productName.textContent = product.name;
        //Add Name tag to the productDiv
        productName.classList.add("product_name");
        productDiv.appendChild(productName);

        // create a new p tag to display the prodcut price
        const productPrice = document.createElement("p");
        productPrice.textContent = `Rs.${product.price}`;
        //Add Price tag to the productDiv
        productPrice.classList.add("product_price");
        productDiv.appendChild(productPrice);

        // create a new p tag to display the prodcut weight
        const productWeight = document.createElement("p");
        productWeight.textContent = `${product.weight}`;
        productWeight.classList.add("product_wegiht");
        productDiv.appendChild(productWeight);

        // Create Add to cart button
        const productButton = document.createElement("button");
        productButton.textContent = "Add to Cart";
        // Add class to style the button
        productButton.classList.add("add_to_cart_btn");
        //Add  button to the productDiv
        productDiv.appendChild(productButton);

        // Append the productDiv to the product list container
        productList.appendChild(productDiv);

        // Add click event listener to the product image
        productImage.addEventListener("click", function () {
          const productId = productImage.dataset.id; // Allow to display an item when it is cliked
          console.log(`Fetching details for product ID: ${productId}`); // Debugging log and prints the product ID to the browser console to help track what ID is being fetched.
          getSingleProduct(productId);
        });

        // Add click event listener to the Add to Cart Btn
        productButton.addEventListener("click", function () {
          addToCartByProdList(product);
        });
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

//on click add to cart button
function addToCartByProdList(product) {
  let cart = localStorage.getItem("cart");
  let cartItems = JSON.parse(cart);
  if (cartItems.length == 0) {
    cartItems.push({ Product: product, Quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } else {
    let index = cartItems.findIndex((item) => item.Product.id == product.id);
    if (index === -1) {
      cartItems.push({ Product: product, Quantity: 1 });
    } else {
      cartItems[index].Quantity = cartItems[index].Quantity + 1;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  alert("Product is added to cart!");
  // let cartItems = [{Product: null, Quantity: 0}, {Product: null, Quantity: 0}, {Product: null, Quantity: 0}];
  // cartItems.push({Product: av, Quantity: 6})
}

// Function to display product details of a single When Clicked
function displayProductDetails(product) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear the existing product list

  //Create nev div tag
  const productDiv = document.createElement("div");
  // Set class for the new div
  productDiv.classList.add("product");
  //set id to div
  productDiv.id = "productId_" + product.id;

  //Set image source
  const productImage = document.createElement("img");
  productImage.src = product.imageUrl;
  productImage.classList.add("product_img");
  //Add image tag to the productDiv
  productDiv.appendChild(productImage);

  // create a new H2 tag to display the prodcut name
  const productName = document.createElement("h2");
  productName.textContent = product.name;
  //Add Name tag to the productDiv
  productName.classList.add("product_name");
  productDiv.appendChild(productName);

  // create a new p tag to display the prodcut name
  const productPrice = document.createElement("p");
  productPrice.textContent = `Rs.${product.price}`;
  productPrice.classList.add("product_price");
  // Add price tag to productDiv
  productDiv.appendChild(productPrice);

  // create a new p tag to display the prodcut name
  const productWeight = document.createElement("p");
  productWeight.textContent = `${product.weight}`;
  productWeight.classList.add("product_weight");
  // Add weight tag to productDiv
  productDiv.appendChild(productWeight);

  // Create Add to cart button
  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.classList.add("add_to_cart_btn");
  // Add addToCartButton tag to productDiv
  productDiv.appendChild(addToCartButton);
  addToCartButton.addEventListener("click", () => {
    onClickAddToCart(productDiv.id);
  });

  // add item to cart from single product page
  addToCartButton.addEventListener("click", function () {
    addToCartByProdList(product);
  });

  // Create Back button
  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  backButton.classList.add("back_btn");
  // Add addToCartButton tag to productDiv
  productDiv.appendChild(backButton);
  backButton.addEventListener("click", () => {
    onClickBackBtn(productDiv.id);
  });

  // Append the productDiv to the product list container
  productList.appendChild(productDiv);

  // Center the content
  productDiv.style.textAlign = "center";
}

//on click add to cart
function onClickAddToCart(productDivId) {
  const selectedProductDiv = document.getElementById(productDivId);
  selectedProductDiv.innerHTML = "";
  selectedProductDiv.style.display = "none";
  getProductList();
}

//Back Button Funtion
function onClickBackBtn(productDivId) {
  const selectedProductDiv = document.getElementById(productDivId);
  selectedProductDiv.innerHTML = "";
  selectedProductDiv.style.display = "none";
  getProductList();
}
