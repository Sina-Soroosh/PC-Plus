const contaner = $.querySelector(".cutaner");
const showSumCart = $.querySelector(".sum .price .sum-cart");
const btnOrder = $.querySelector(".btn button")
let variables1 = "";
let variables2 = "";
let variables3 = "";
let sum = 0;
function addToDom() {
  contaner.innerHTML = "";
  if (cart.length) {
    cart.forEach((product) => {
      contaner.insertAdjacentHTML(
        "beforeend",
        `
           <div class="proudct">
           <div class="img">
               <a href="product.html?id=${product.id}">
                   <img src="${product.images[0]}" alt="">
               </a>
           </div>
           <div class="info">
               <div class="name">
                   <a href="product.html?id=${product.id}">
                       <h2>${product.name}</h2>
                   </a>
               </div>
               <div class="price-cunt">
                   <div class="price">
                       <p>تومان ${separtateTheNumber(product.price)}</p>
                   </div>
                   <div class="cunt">
                       <div class="change-cunt">
                           <div onclick="changeCunt(event,${
                             product.id
                           })" class="plus-mins" id="plus">
                               <i class="fas fa-plus"></i>
                           </div>
                           <span>${product.cunt}</span>
                           <div onclick="changeCunt(event,${
                             product.id
                           })" class="plus-mins" id="mins">
                               <i class="fas fa-minus"></i>
                           </div>
                           <div onclick="changeCunt(event,${
                             product.id
                           })" id="delete">
                              <i class="fas fa-trash-can"></i>
                          </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
           `
      );
    });
  } else {
    contaner.innerHTML = `                    
    <div class="error">
      <div class="cart-icon">
        <i class="fas fa-cart-plus"></i>
      </div>
      <p>سبد خرید شما خالی می باشد</p>
    </div>
`;
  }
  resualtSum();
}
function changeCunt(e, id) {
  if (e.target.id) {
    variables1 = e.target;
  } else {
    variables1 = e.target.parentElement;
  }
  variables2 = cart.findIndex((product) => {
    return product.id == id;
  });
  if (variables1.id == "mins") {
    if (cart[variables2].cunt != 1) {
      cart[variables2].cunt--;
      addToDom();
      addToLocalStorage();
      resualtSum();
    } else {
      deleteProudct();
    }
  } else if (variables1.id == "plus") {
    cart[variables2].cunt++;
    addToDom();
    addToLocalStorage();
    resualtSum();
  } else {
    deleteProudct();
  }
}
function deleteProudct() {
  Swal.fire({
    icon: "warning",
    title: "آیا از حذف محصول از سبد خرید مطمئن هستید؟",
    showCancelButton: true,
    cancelButtonText: "نه",
    confirmButtonColor : "#c42525",
    confirmButtonText: "بله , از سبد خرید حذف شود",
  }).then((result) => {
    if (result.isConfirmed) {
      cart.splice(variables2, 1);
      addToDom();
      addToLocalStorage();
      Swal.fire({
        icon: "success",
        title: "محصول از سبد خرید حذف شد",
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
    }
  });
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
function resualtSum() {
  sum = 0;
  cart.forEach((product) => {
    sum += product.price * product.cunt;
  });
  showSumCart.innerHTML = `${separtateTheNumber(sum)} تومان`;
}
function order () {
  if(sum){
    cart = []
    addToLocalStorage()
    Swal.fire({
      icon:"success",
      title:"محصولات شما با موفقیت خریداری شد",
      confirmButtonText : "متوجه شدم",
      confirmButtonColor : "#3d9970",
    }).then(() => location.href = "index.html")
  }else{
    Swal.fire({
      icon: "warning",
      title: "سبد خرید شما خالی می باشد",
      confirmButtonText: "متوجه شدم",
      confirmButtonColor : "#c42525",
    })
  }
}
addToDom();
btnOrder.addEventListener("click",order)