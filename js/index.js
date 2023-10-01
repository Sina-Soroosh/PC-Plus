import { products } from "./database.js";
const swiperWrapperRandom = $.querySelector(".swiper-wrapper-random");
const swiperWrapperBestSeller = $.querySelector(".swiper-wrapper-best-seller");
const swiperWrapperNew = $.querySelector(".swiper-wrapper-new");
const swiper = new Swiper(".slider-images", {
  loop: true,
  navigation: {
    nextEl: ".imgslider-button-next",
    prevEl: ".imgslider-button-prev",
  },
  autoplay: true,
});
const swiperList = new Swiper(".list-slider", {
  loop: true,
  navigation: {
    nextEl: ".button-next-list",
    prevEl: ".button-prev-list",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});
const swiperBestSeller = new Swiper(".slider", {
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
  spaceBetween: 5,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});
let arrayList = [
  "CPU",
  "motherboard",
  "GPU",
  "monitor",
  "RAM",
  "harddisk",
  "SSD",
  "case",
  "power",
  "fanCPU",
];
let btnsAddCart = null
let arrayRandomProudact = [];
let randomNumber = 0;
let randomNumber2 = 0;
let variables1 = "";
let variables2 = "";
let variables3 = "";
let idProductSelect = null
let productSelect = null
function addToRnadomPorudact() {
  for (let i = 0; i < 8; i++) {
    randomNumber = Math.floor(Math.random() * (arrayList.length - 1));
    randomNumber2 = Math.floor(Math.random() * 3);
    arrayRandomProudact.push(
      products[arrayList[randomNumber]][
        randomNumber2 != 0 ? randomNumber2 : ++randomNumber2
      ]
    );
  }
  arrayRandomProudact.forEach((cart) => {
    swiperWrapperRandom.insertAdjacentHTML(
      "beforeend",
      `
      <div class="swiper-slide cart">
      <a href="product.html?id=${cart.id}">
      <div class="img">
          <img src="${cart.images[0]}" alt="">
      </div>
      </a>
      <div class="info">
      <a href="product.html?id=${cart.id}">
          <div class="title">
              <p>${cart.name}</p>
          </div>
      </a>
          <div class="price">
          <div id="${cart.id}" title="اضافه کردن به سبد خرید" class="add-cart">
             <i class="fas fa-cart-arrow-down"></i>
          </div>
             ${separtateTheNumber(cart.price)} تومان 
          </div>
      </div>
  </div>
        `
    );
  });
  btnsAddCart = $.querySelectorAll(".add-cart")
  btnsAddCart.forEach(btn => {
    btn.addEventListener("click",() => {
      addToCart(btn.id)
    })
  })
}
function addToSliders() {
  for (let key in products) {
    products[key].forEach((cart) => {
      if (cart.bestseller) {
        swiperWrapperBestSeller.insertAdjacentHTML(
          "beforeend",
          `
          <div class="swiper-slide cart">
          <a href="product.html?id=${cart.id}">
          <div class="img">
              <img src="${cart.images[0]}" alt="">
          </div>
          </a>
          <div class="info">
          <a href="product.html?id=${cart.id}">
              <div class="title">
                  <p>${cart.name}</p>
              </div>
          </a>
              <div class="price">
              <div id="${cart.id}" title="اضافه کردن به سبد خرید" class="add-cart">
                 <i class="fas fa-cart-arrow-down"></i>
              </div>
                 ${separtateTheNumber(cart.price)} تومان 
              </div>
          </div>
      </div>
                `
        );
      }
      if (cart.new) {
        swiperWrapperNew.insertAdjacentHTML(
          "beforeend",
          `
          <div class="swiper-slide cart">
          <a href="product.html?id=${cart.id}">
          <div class="img">
              <img src="${cart.images[0]}" alt="">
          </div>
          </a>
          <div class="info">
          <a href="product.html?id=${cart.id}">
              <div class="title">
                  <p>${cart.name}</p>
              </div>
          </a>
              <div class="price">
              <div id="${cart.id}" title="اضافه کردن به سبد خرید" class="add-cart">
                 <i class="fas fa-cart-arrow-down"></i>
              </div>
                 ${separtateTheNumber(cart.price)} تومان 
              </div>
          </div>
      </div>
                `
        );
      }
    });
  }
  btnsAddCart = $.querySelectorAll(".add-cart")
  btnsAddCart.forEach(btn => {
    btn.addEventListener("click",() => {
      addToCart(btn.id)
    })
  })
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
async function addToCart (id){
  idProductSelect = id
  await find()
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
function find () {
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
addToSliders();
addToRnadomPorudact();