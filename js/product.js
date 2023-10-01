import { products } from "./database.js";
const breadcrumb = $.querySelector(".breadcrumb");
const sliderImg = $.querySelector(".slider-img .swiper-wrapper");
const sliderImg2 = $.querySelector(".slider-img2 .swiper-wrapper");
const showGrup = $.querySelector(".name .grup h5");
const showName = $.querySelector(".name h2");
const showCode = $.querySelector(".code");
const showPrice = $.querySelector(".price");
const pillsTabContent = $.querySelector("#pills-tabContent");
const addToCart = $.querySelector(".btn button");
const swiper = new Swiper(".slider-img2", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiper2 = new Swiper(".slider-img", {
  spaceBetween: 0,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
let loctionSearch = new URLSearchParams(location.search);
let id = loctionSearch.get("id");
let productSelect = null;
let grupProduct = null;
let variables1 = "";
let variables2 = "";
let variables3 = "";
async function findProduct() {
  if (!id) {
    location.href = "index.html";
  }
  for (const key in products) {
    products[key].forEach((product) => {
      if (product.id == id) {
        productSelect = product;
        grupProduct = [products[key][0], key];
      }
    });
  }
  await addToDom();
}
function addToDom() {
  breadcrumb.innerHTML = `
  <li class="breadcrumb-item"><a href="index.html">فروشگاه پی سی پلاس / </a></li>
  <li class="breadcrumb-item"><a href="category.html?category=${grupProduct[1]}">${grupProduct[0]}</a></li>
  `;
  productSelect.images.forEach((img) => {
    sliderImg.insertAdjacentHTML(
      "beforeend",
      `
    <div class="img swiper-slide">
      <img src="${img}" alt="${productSelect.name}">
    </div>
    `
    );
    sliderImg2.insertAdjacentHTML(
      "beforeend",
      `
    <div class="img swiper-slide">
      <img src="${img}" alt="${productSelect.name}">
    </div>
    `
    );
  });
  showGrup.innerHTML = `<a href="category.html?category=${grupProduct[1]}">${grupProduct[0]}</a>`;
  showName.innerHTML = productSelect.name;
  showCode.innerHTML = `<p> کد محصول : PT-${productSelect.id}</p>`;
  showPrice.innerHTML = `<p> تومان ${separtateTheNumber(
    productSelect.price
  )}</p>`;
  pillsTabContent.innerHTML = productSelect.specifications;
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
function funcAddToCart() {
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
  addToLocalStorage();
}
findProduct();
addToCart.addEventListener("click", funcAddToCart);