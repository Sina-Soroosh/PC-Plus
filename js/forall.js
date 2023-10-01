let $ = document;
let regexSearch = /(?<=\s)\s/g;
const iconMenu = $.querySelector(".icon-menu");
const coverPage = $.querySelector("#coverpage");
const menu = $.querySelector(".menu-parent");
const searchInput = $.querySelector(".search input")
const btnSearch = $.querySelector(".search i")
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
let cart = JSON.parse(localStorage.getItem("productcart")) || [];
function showMenu() {
  menu.classList.add("vis-menu");
  coverPage.style.display = "block";
}
function hideMenu() {
  menu.classList.remove("vis-menu");
  coverPage.style.display = "none";
}
function keydownInputSearch (e) {
  if(e.keyCode == 13){
    searching()
  }
}
function searching () {
  searchInput.value = searchInput.value.replace(regexSearch,"")
  location.href = `category.html?q=${searchInput.value}`
}
function addToLocalStorage() {
  localStorage.setItem("productcart", JSON.stringify(cart));
}
coverPage.addEventListener("click", hideMenu);
iconMenu.addEventListener("click", showMenu);
searchInput.addEventListener("keydown",keydownInputSearch)
btnSearch.addEventListener("click",searching)