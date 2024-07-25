document.addEventListener("DOMContentLoaded", function () {
  const login_btn = document.getElementById("login_btn");
  login_btn.addEventListener("click", function () {
    onClickLogin();
  });
});

function onClickLogin() {
  let user_name = document.getElementById("user_name");
  let password_id = document.getElementById("password_id");
  if (
    user_name.value.trim().length > 0 &&
    password_id.value.trim().length > 0
  ) {
    //Get product list from backend API call start
    fetch(
      `http://localhost/supermarket_web/login.php?userName=${user_name.value}&password=${password_id.value}`
    )
      .then((response) => response.json())
      .then((user_details) => {
        if (user_details.email) {
          localStorage.clear();
          localStorage.setItem("user", JSON.stringify(user_details));
          window.location.href = "home.html";
        } else {
          let login_error = document.getElementById("login_error");
          login_error.textContent = "Login Faild!";
        }
        console.log(user_details);
      });
  }
}
