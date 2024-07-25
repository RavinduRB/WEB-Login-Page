document.addEventListener("DOMContentLoaded", function () {
  var admin_products_pg = document.getElementById("admin_products_pg");
  let user = localStorage.getItem("user");
  user_details = JSON.parse(user);
  if (user_details.user_type !== "admin") {
    admin_products_pg.style.display = "none";
  } else {
    admin_products_pg.style.display = "block";
  }

  genarateProductTable();
  // Get the Add New button, add product and the edit form container
  const addNewButton = document.getElementById("show-add-product-form");
  const addProductFormContainer = document.getElementById(
    "add-product-form-container"
  );
  const editProductFormContainer = document.getElementById(
    "edit-product-form-container"
  );

  // Add click event listener to the Add New button
  addNewButton.addEventListener("click", function () {
    addProductFormContainer.style.display = "block"; // Show the form
    editProductFormContainer.style.display = "none"; // Hide the form
  });

  // Get the AddNew button element by its ID
  const button = document.getElementById("add_new_product");

  // Attach an event listener to the AddNew button
  button.addEventListener("click", function (event) {
    onClickCreateProduct(event);
  });

  // Get the image URL input element
  const imageUrlInput = document.getElementById("image_url");

  // Add event listener to the image URL input element
  imageUrlInput.addEventListener("change", onImageUrlChange);
  let prod_image_content = document.getElementById("prod_image_content_new");
  // Show the Image in add
  let empty_image_content = document.getElementById("empty_image_content_new");
  let productImageUrl = document.getElementById("image_url");
  if (productImageUrl.value.trim().length > 0) {
    // Remove the space between strings
    prod_image_content.style.display = "flex";
    empty_image_content.style.display = "none";
    document.getElementById("product_img_new").src = productImageUrl.value;
  } else {
    prod_image_content.style.display = "none";
    empty_image_content.style.display = "flex";
  }

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

// Real Time Image Changing Function for AddNew Page
function onImageUrlChange() {
  let prod_image_content = document.getElementById("prod_image_content_new");

  let empty_image_content = document.getElementById("empty_image_content_new");
  let productImageUrl = document.getElementById("image_url");
  if (productImageUrl.value.trim().length > 0) {
    // Remvoe the Space between strings
    prod_image_content.style.display = "flex";
    empty_image_content.style.display = "none";
    document.getElementById("product_img_new").src = productImageUrl.value;
  } else {
    prod_image_content.style.display = "none";
    empty_image_content.style.display = "flex";
  }
}

// Function to create the Table and Display the Data
function genarateProductTable() {
  let searchVal = " ";
  var selectedValue = "ALL";
  if (searchVal.trim().length == 0) {
    searchVal = " ";
  }
  //Get product list from backend API call start
  fetch(
    `http://localhost/supermarket_web/admin-index.php?cat=${selectedValue}&search=${searchVal}`
  )
    .then((response) => response.json())
    .then((products) => {
      const productListTable = document.querySelector(
        "#product-list-table tbody"
      );
      productListTable.innerHTML = ""; // Clear existing rows

      products.forEach((product) => {
        const productRow = document.createElement("tr");

        // Create and append product name cell
        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        productRow.appendChild(nameCell);

        // Create and append product price cell
        const priceCell = document.createElement("td");
        priceCell.textContent = `Rs.${product.price}`;
        productRow.appendChild(priceCell);

        // Create and append product weight cell
        const weightCell = document.createElement("td");
        weightCell.textContent = product.weight;
        productRow.appendChild(weightCell);

        // Create and append actions cell
        const actionsCell = document.createElement("td");
        actionsCell.classList.add("acction_cell");

        // Create and append "Edit" button
        const editProdBtn = document.createElement("button");
        editProdBtn.textContent = "Edit";
        editProdBtn.classList.add("edit_btn");
        editProdBtn.addEventListener("click", function () {
          debugger;
          selectEditingProduct(product);
          const productId = detailsButton.dataset.id;
          console.log(`Fetching details for product ID: ${productId}`);
          // Call getSingleProduct or handle details fetching here
        });
        actionsCell.appendChild(editProdBtn);

        // Create and append "Details" button
        const detailsButton = document.createElement("button");
        detailsButton.textContent = "Delete";
        detailsButton.classList.add("delete_btn");
        detailsButton.dataset.id = product.id;
        detailsButton.addEventListener("click", function () {
          const productId = detailsButton.dataset.id;
          onClickDeleteProduct(productId);
          console.log(`Fetching details for product ID: ${productId}`);
          // Call getSingleProduct or handle details fetching here
        });
        actionsCell.appendChild(detailsButton);

        productRow.appendChild(actionsCell);

        // Append the productRow to the product list table
        productListTable.appendChild(productRow);
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

// Function to be triggered on AddNew button click
function onClickCreateProduct(event) {
  event.preventDefault();
  // Get the form element
  const form = document.getElementById("add-product-form");

  // Get values from the form inputs
  let newProduct = {
    Id: 0,
    Name: form.product_name.value,
    Price: form.price.value,
    Weight: form.weight.value,
    ImageUrl: form.image_url.value,
    Category: form.product_cat.value,
  };

  // Send the data to the PHP script using fetch
  fetch(`http://localhost/supermarket_web/admin-index.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Log the response from the PHP script
      alert("Product added successfully!");
      genarateProductTable();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Select editing product
function selectEditingProduct(product) {
  // Get the image URL input element
  const imageUrlInput = document.getElementById("edit_image_url");

  // Add event listener to the image URL input element
  imageUrlInput.addEventListener("change", onEditImageUrlChange);

  const formNewContainer = document.getElementById(
    "add-product-form-container"
  );
  formNewContainer.style.display = "none";
  const formEditContainer = document.getElementById(
    "edit-product-form-container"
  );
  formEditContainer.style.display = "block";

  const formEdit = document.getElementById("edit-product-form");

  let prod_image_content = document.getElementById("prod_image_content");

  let empty_image_content = document.getElementById("empty_image_content");

  formEdit.edit_product_name.value = product.name;
  formEdit.edit_price.value = product.price;
  formEdit.edit_image_url.value = product.imageUrl;
  formEdit.edit_weight.value = product.weight;
  formEdit.edit_product_cat.value = product.category_code;
  if (product.imageUrl.trim().length > 0) {
    prod_image_content.style.display = "flex";
    empty_image_content.style.display = "none"; // JJ stopped here
    document.getElementById("edit_product_img").src = product.imageUrl;
  } else {
    prod_image_content.style.display = "none";
    empty_image_content.style.display = "flex";
  }
  // Get the button element by its ID
  const button = document.getElementById("update_product_btn");
  // Attach an event listener to the button
  button.addEventListener("click", function (event) {
    event.preventDefault();
    onClickUpdateProduct(product);
  });
}

function onEditImageUrlChange() {
  let productImageUrl = document.getElementById("edit_image_url");
  let prod_image_content = document.getElementById("prod_image_content");

  let empty_image_content = document.getElementById("empty_image_content");
  if (productImageUrl.value.trim().length > 0) {
    prod_image_content.style.display = "flex";
    empty_image_content.style.display = "none";
    // document.getElementById("edit_image_url").src = productImageUrl.value;
    document.getElementById("edit_product_img").src = productImageUrl.value;
  } else {
    prod_image_content.style.display = "none";
    empty_image_content.style.display = "flex";
  }
}

function onClickUpdateProduct(product) {
  debugger;
  const form = document.getElementById("edit-product-form");
  // Get values from the form inputs
  let editingProduct = {
    Id: product.id,
    Name: form.edit_product_name.value,
    Price: form.edit_price.value,
    Weight: form.edit_weight.value,
    ImageUrl: form.edit_image_url.value,
    Category: form.edit_product_cat.value,
  };

  // Send the data to the PHP script using fetch
  fetch(`http://localhost/supermarket_web/admin-index.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editingProduct),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Log the response from the PHP script
      alert("Product added successfully!");
      genarateProductTable();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to be triggered on delete button click
function onClickDeleteProduct(productId) {
  // Send the delete request to the PHP script using fetch
  fetch(`http://localhost/supermarket_web/admin-index.php`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: productId }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Log the response from the PHP script
      alert("Product deleted successfully!");
      // Optionally, you can refresh the product list or remove the deleted product from the DOM
      genarateProductTable();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
