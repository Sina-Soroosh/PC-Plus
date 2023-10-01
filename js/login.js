const login = $.querySelector(".login");
const loginByCode = $.querySelector(".login-by-code");
const inputPhone = $.querySelector(".phone");
const inputCode = $.querySelector(".code");
const textCode = $.querySelector(".login-by-code p");
const btnConfirmationPhone = $.querySelector(".login button");
const btnConfirmationCode = $.querySelector(".login-by-code button");
const changePhone = $.querySelector(".login-by-code span");
let regexPhoneNumber = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/g;
let flagNumber = false;
let number = null;
function cheackNumber() {
  flagNumber = regexPhoneNumber.test(inputPhone.value);
  if (!flagNumber) {
    Swal.fire({
      icon: "error",
      title: "شماره وارد شده نا معتبر میباشد",
      confirmButtonText: "متوجه شدم",
      confirmButtonColor: "#c42525",
    });
  } else {
    number = inputPhone.value;
    inputPhone.value = "";
    login.style.display = "none";
    textCode.innerHTML = `کد ورود یکبار مصرف شما به شماره‌ی ${number} ارسال شد. لطفا آن را وارد نمایید.`;
    loginByCode.style.display = "block";
    inputCode.focus()
  }
}
function cheackCode() {
  if (inputCode.value.length == 6) {
    Swal.fire({
      icon: "success",
      title: "با موفقیت وارد حساب کاربری خود شدید",
      confirmButtonText: "متوجه شدم",
      confirmButtonColor: "#3d9970",
    }).then(() => (location.href = "index.html"));
  } else {
    Swal.fire({
      icon: "error",
      title: "کد وارد شده معتبر نمیباشد",
      confirmButtonText: "متوجه شدم",
      confirmButtonColor: "#c42525",
    });
  }
}
function funcChangePhone () {
    login.style.display = "block";
    loginByCode.style.display = "none";
    inputPhone.focus()
}
window.onload = () => inputPhone.focus()
btnConfirmationPhone.addEventListener("click", cheackNumber);
btnConfirmationCode.addEventListener("click", cheackCode);
inputPhone.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    cheackNumber();
  }
});
inputCode.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    cheackCode();
  }
});
changePhone.addEventListener("click",funcChangePhone)