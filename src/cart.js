let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
     cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    // console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y));
};
calculation();



let generateCartItem= ()=>{
    if(basket.length !== 0){
       shoppingCart.innerHTML = basket.map((x)=>{
        // console.log(x);
        let {id,item} = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
        <div class = "cart-item">
        <img width="113" height="113" src="${search.img}" alt="">

          <div class = "details">
          <div class = "title-price-x">
          <h4 class = "title-price">
            <p>${search.name}</p>
            <p class = "cart-item-price"a>$ ${search.price}</p>
           </h4>
          
           <i class="bi bi-x-lg" onclick = "removeItem(${id})" ></i>
          </div>

        <div class="buttons">
            <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
            <div id = ${id} class="quantity">${x.item}</div>
            <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
       </div>

        <h3>$ ${item*search.price}</h3>
        </div>
        </div>
        `
       })
       .join("")
    }else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty<h2>
        <a href="index.html">
        <button class="homeBtn">Back to Home<button>
        </a>
        `
    }
}
generateCartItem();

let increment = (seleactId)=>{
    let search = basket.find((x)=> x.id === seleactId.id);
    if(search === undefined){
        basket.push({
            id:seleactId.id,
            item:1
        });
    }else{
        search.item +=1;
    }
    generateCartItem();
    update(seleactId.id);
    localStorage.setItem("data",JSON.stringify(basket));   

};


let decrement = (seleactId)=>{
    let search = basket.find((x)=> x.id === seleactId.id);
    if(search === undefined) return;
    else if(search.item === 0)return;
   
    else{
        search.item -= 1
    }
   
    update(seleactId.id);
    basket = basket.filter((x)=> x.item !== 0);
    generateCartItem();
    localStorage.setItem("data",JSON.stringify(basket));
    
};

let update = (seleactId)=>{
    let search = basket.find ((x) => x.id === seleactId);
 //    console.log(search.item);
    document.getElementById(seleactId).innerHTML = search.item;
 
    calculation();
    totalAmount();
 }


let removeItem = (seleactId) =>{
//    console.log(seleactId.id);
basket = basket.filter((x)=>x.id !== seleactId.id);
generateCartItem();
totalAmount();
localStorage.setItem("data",JSON.stringify(basket));
calculation();
}



let clearCart = ()=>{
   basket = [];
   generateCartItem();
   localStorage.setItem("data",JSON.stringify(basket));
   calculation();

}


let totalAmount = ()=>{
    if(basket.length !== 0){
        generateCartItem()
     let total = basket.map((x)=>{
     let {item,id} = x;
     let search = shopItemsData.find((y) => y.id === id) || [];
     return item *search.price;
     }).reduce((x,y)=>x+y)
    //  console.log(total);
   
    label.innerHTML = `
    <h2>Total Bill : $ ${total}</h2>
    <button class="checkout">Checkout<button>
    <button onclick = clearCart() class="removeAll">Clear Cart<button>
    `
    }else return;
}
totalAmount();


