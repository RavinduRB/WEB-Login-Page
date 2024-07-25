document.addEventListener("DOMContentLoaded", function () {
  var admin_products_pg = document.getElementById("admin_products_pg");
  let user = localStorage.getItem("user");
  user_details = JSON.parse(user);

  if (user_details.user_type !== "admin") {
    admin_products_pg.style.display = "none";
  } else {
    admin_products_pg.style.display = "block";
  }

  let cartItems = [];

  let cart = localStorage.getItem("cart");
  cartItems = JSON.parse(cart);
  if (cartItems == null || cartItems.length == 0) {
    cartItems = [];
  }

  generateCartItemList(cartItems);

  // onClickLogOut funtion
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

function generateCartItemList(productData) {
  // Get the product table body element
  const productTableBody = document.querySelector("#product-table tbody");
  productTableBody.textContent = "";
  let totalAmount = 0; // Variable to store the total amount

  // Generate HTML for each product and append to the table body
  productData.forEach((item, index) => {
    const product = item.Product;

    // Calculate the total amount
    totalAmount += product.price * item.Quantity;

    // Create a table row element
    const row = document.createElement("tr");

    // Create and set the product image cell
    const imageCell = document.createElement("td");
    const productImage = document.createElement("img");
    productImage.classList.add("imgInCart");
    productImage.src = product.imageUrl;
    productImage.alt = product.name;
    imageCell.appendChild(productImage);
    row.appendChild(imageCell);

    // Create and set the product name cell
    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    // Create and set the product price cell
    const priceCell = document.createElement("td");
    priceCell.textContent = `Rs.${product.price}`;
    row.appendChild(priceCell);

    // Create and set the product weight cell
    const weightCell = document.createElement("td");
    weightCell.textContent = product.weight;
    row.appendChild(weightCell);

    // Create and set the product quantity cell
    const quantityCell = document.createElement("td");
    const quantityLbl = document.createElement("label");
    quantityLbl.classList.add("quantityLbl");
    quantityLbl.textContent = item.Quantity;

    // Create and append AddButton
    const inQuantity = document.createElement("button");
    inQuantity.textContent = "+";
    inQuantity.classList.add("inQuantity_btn");
    inQuantity.addEventListener("click", function () {
      productData[index].Quantity = productData[index].Quantity + 1;
      // Call getSingleProduct or handle details fetching here

      localStorage.setItem("cart", JSON.stringify(productData));
      generateCartItemList(productData);
    });

    // Create and append  minusButton
    const deQuantity = document.createElement("button");
    deQuantity.textContent = "-";
    deQuantity.classList.add("deuantity_btn");
    deQuantity.addEventListener("click", function () {
      // Call getSingleProduct or handle details fetching here
      if (productData[index].Quantity == 1) {
        productData.splice(index, 1);
      } else {
        productData[index].Quantity = productData[index].Quantity - 1;
      }

      localStorage.setItem("cart", JSON.stringify(productData));
      generateCartItemList(productData);
    });

    quantityCell.appendChild(deQuantity);
    quantityCell.appendChild(quantityLbl);
    quantityCell.appendChild(inQuantity);

    row.appendChild(quantityCell);

    // Append the row to the table body
    productTableBody.appendChild(row);
  });

  // Clear the cart_summary div before appending new elements
  const cart_summary = document.getElementById("cart_summary");

  //Clearing cart_summary Before appending new elements to cart_summary
  cart_summary.innerHTML = "";

  // Display the total amount
  const totalAmountDiv = document.createElement("div");
  totalAmountDiv.classList.add("total-amount");
  totalAmountDiv.textContent = `Total Amount: Rs.${totalAmount}`;

  //purchaseBtn in cart
  const purchaseBtn = document.createElement("button");
  purchaseBtn.classList.add("purchase_btn");
  purchaseBtn.textContent = "Purchase";

  //DefaultText in cart
  const defaultText = document.createElement("div");
  defaultText.classList.add("default_Text");
  defaultText.textContent = "No Items in Cart!";
  if (productData.length > 0) {
    cart_summary.appendChild(totalAmountDiv);
    cart_summary.appendChild(purchaseBtn);
    purchaseBtn.addEventListener("click", function () {
      let cartItems = [];
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.location.href = "user-products.html";
    });
  } else {
    cart_summary.appendChild(defaultText);
  }

  //Purchase Button
  const purchase_div = document.getElementById("purchase_div");
  const purchase = document.createElement("button");

  purchase.textContent = "Purchase";
  purchase.classList.add("purchase_btn");
}
