
let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];


let genarateShop = ()=>{
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id,name,decp,price,img} = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div class="item">
       <img width="219" height = "260" src="${img}" alt="">
       <div class="details">
           <h3>${name}</h3>
           <p>${decp}</p>
           <div class="price-quantity">
               <h2>$ ${price}</h2>
               <div class="buttons">
                  <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id = ${id} class="quantity">${search.item === undefined ? 0:search.item }</div>
                  <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
               </div>
       </div> 
       </div>
   </div>`
    }).join(""));
}
genarateShop();

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

    update(seleactId.id);
    localStorage.setItem("data",JSON.stringify(basket));   
// console.log(basket)
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
    localStorage.setItem("data",JSON.stringify(basket));
    // console.log(basket)
};


let update = (seleactId)=>{
   let search = basket.find ((x) => x.id === seleactId);
//    console.log(search.item);
   document.getElementById(seleactId).innerHTML = search.item;

   calculation();
}

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
     cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    // console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y));
};
calculation();