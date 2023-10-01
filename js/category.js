import { products } from "./database.js";
const breadCrumb = $.querySelector(".breadcrumb");
const title = $.querySelector(".h2-title");
const btnsSortmode = $.querySelectorAll(".btn-sortmode");
const content = $.querySelector("#listing-result .row");
const modeTable = $.querySelector(".grid-list-buttons #table")
const modeList = $.querySelector(".grid-list-buttons #list")
let loctionSearch = new URLSearchParams(location.search);
let category = loctionSearch.get("category");
let search = loctionSearch.get("q");
let arrayProduct = [];
let sortMode = "assumption";
let variables1 = "";
let variables2 = "";
let variables3 = "";
let idProductSelect = null
let productSelect = null
let btnsAddCart = null
let flagTable = true
function calculateBreadCrumb() {
  if (!category && !search) {
    location.href = "index.html";
  }
  arrayProduct = [];
  breadCrumb.innerHTML = "";
  breadCrumb.insertAdjacentHTML(
    "beforeend",
    `
    <li class="breadcrumb-item"><a href="index.html">فروشگاه پی سی پلاس  </a></li>
    `
  );
  if (category) {
    products[category].forEach((product) => {
      if (product.id) {
        arrayProduct.push(product);
      } else {
        title.innerHTML = product;
        breadCrumb.insertAdjacentHTML(
          "beforeend",
          `
              <li class="breadcrumb-item"><a href=""> / ${product}</a></li>
              `
        );
      }
    });
  } else if (search) {
    for (const key in products) {
      products[key].forEach((product) => {
        if (product.name) {
          if (product.name.toLowerCase().includes(search.toLocaleLowerCase())) {
            arrayProduct.push(product);
          }
        }
      });
    }
    title.innerHTML = `نتایج جستجو : ${search}`;
  } else {
    location.href = "index.html";
  }
  addToDom(arrayProduct);
}
function changeSortMode(e) {
  btnsSortmode.forEach((btn) => {
    btn.classList.remove("sel-btn-sortmode");
  });
  e.target.classList.add("sel-btn-sortmode");
  sortMode = e.target.id;
  applyRestrictions();
}
function addToDom(array) {
  content.innerHTML = "";
  array.forEach((product) => {
    content.insertAdjacentHTML(
      "beforeend",
      `
        <div class="col-12 col-md-3 product-item-holder ${!flagTable ? "product-item-holder-list" : ""}" data-price="${
          product.price
        }">
        <div class="product-item prd-tag">
            <a href="product.html?id=${product.id}" class="open-prd">
                <div class="image">
                    <img class="main" decoding="async"
                        src="${product.images[0]}" alt="${product.name}">
                </div>
            </a>
            <div class="flex-grow-1">
                <div class="body">
                    <div class="title">
                        <a href="product.html?id=${
                          product.id
                        }" class="open-prd">${product.name}</a>
                    </div>
                </div>

                <div class="price-box">
                    <div class="price">
                    <div id="${
                      product.id
                    }" title="اضافه کردن به سبد خرید" class="add-cart">
                    <i class="fas fa-cart-arrow-down"></i>
                 </div>
                            <div class="price-now">${separtateTheNumber(
                              product.price
                            )}<span class="unit"> تومان </span></div>
                        </div>
                </div>
            </div>
        </div>
    </div>
        `
    );
  });
  btnsAddCart = $.querySelectorAll(".add-cart");
  btnsAddCart.forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.id);
    });
  });
  if (!array.length) {
    content.innerHTML = `
    <div class="error">
      <p><b>کالایی پیدا نشد</b></p>
      <p>روزانه صدها کالای جدید در پی سی پلاس اضافه میشود، پس دوباره به ما سر بزنید!</p>
    </div>`;
  }
}
function applyRestrictions() {
  arrayProduct.sort(function (product1, product2) {
    return product1.price - product2.price;
  });
  if (sortMode == "assumption") {
    calculateBreadCrumb();
    return false;
  } else if (sortMode == "costdesc") {
    arrayProduct.reverse();
  }
  addToDom(arrayProduct);
}
function separtateTheNumber(num) {
  variables1 = String(num).split("").reverse();
  variables2 = "";
  variables3 = "";
  for (let i = 1; i < variables1.length + 1; i++) {
    variables2 += variables1[i - 1];
    if (i % 3 == 0 && i != variables1.length) {
      variables2 += ",";
    }
  }
  variables2 = variables2.split("").reverse();
  variables2.forEach((char) => {
    variables3 += char;
  });
  return variables3;
}
async function addToCart(id) {
  idProductSelect = id;
  await find();
  if (cart.length) {
    variables1 = cart.findIndex((product) => {
      return product.id == productSelect.id;
    });
    if (variables1 == -1) {
      cart.push(productSelect);
      cart[cart.length - 1].cunt = 1;
    } else {
      cart[variables1].cunt++;
    }
  } else {
    cart.push(productSelect);
    cart[0].cunt = 1;
  }
  Toast.fire({
    title: "محصول مورد نظر به سبد خرید شما اضافه شد",
    imageUrl: `${productSelect.images[0]}`,
    imageWidth: 85,
  });
  console.log(cart);
  addToLocalStorage();
}
function find() {
  if (!idProductSelect) {
    location.href = "index.html";
  }
  for (const key in products) {
    products[key].forEach((product) => {
      if (product.id == idProductSelect) {
        productSelect = product;
      }
    });
  }
}
function changeModeShow (e) {
  if(e.target.id == "table"){
    flagTable = true
  }else{
    flagTable = false
  }
  if(flagTable){
    modeList.classList.remove("sel-mode")
    modeTable.classList.add("sel-mode")
  }else{
    modeList.classList.add("sel-mode")
    modeTable.classList.remove("sel-mode")
  }
  addToDom(arrayProduct)
}
btnsSortmode.forEach((btn) => {
  btn.onclick = changeSortMode;
});
calculateBreadCrumb();
modeList.addEventListener("click",changeModeShow)
modeTable.addEventListener("click",changeModeShow)