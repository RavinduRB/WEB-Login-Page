document.addEventListener("DOMContentLoaded", function () {
  var admin_products_pg = document.getElementById("admin_products_pg");
  let user = localStorage.getItem("user");
  user_details = JSON.parse(user);

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
});

// onClickLogOut funtion

function onClickLogOut() {
  localStorage.clear();
  window.location.href = "login.html";
}
