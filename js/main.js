/**slider */
let sliderImgs=document.getElementsByClassName("slideImg");
var i=0;
console.log(sliderImgs);

var autoSliding=setInterval(function(){

    sliderImgs[i].style.display='none';
    if(i==sliderImgs.length-1)
        i=-1;
    sliderImgs[++i].style.display='block';
},2000)


function next()
{
    clearInterval(autoSliding);
    sliderImgs[i].style.display='none';
        if(i==sliderImgs.length-1)
            i=-1;
        sliderImgs[++i].style.display='block';
        autoSliding=setInterval(function(){

            sliderImgs[i].style.display='none';
            if(i==sliderImgs.length-1)
                i=-1;
            sliderImgs[++i].style.display='block';
        },2000)
}
function back()
{
    clearInterval(autoSliding);
    sliderImgs[i].style.display='none';
        if(i==0)
            i=sliderImgs.length-1;
        sliderImgs[--i].style.display='block';
        autoSliding=setInterval(function(){

            sliderImgs[i].style.display='none';
            if(i==sliderImgs.length-1)
                i=-1;
            sliderImgs[++i].style.display='block';
        },2000)
}
/////////////////////////end slider//////////////////////////////

/*****start products ****/
let Data;
let cartproducts;
if(localStorage.cartelements)
{
    cartproducts=localStorage.cartelements.replace(',','').split(',');
}
else{
    cartproducts=localStorage.cartelements=[];
}

async function getData()
{
    let response=await fetch("http://localhost:3000/products");
    let data=await response.json();
    await buildcards(data);
}

let categories=document.getElementsByClassName("categories")[0];
async function buildcards(data)
{
    Date=data;
    var products=document.getElementsByClassName("products")[0];
    products.remove();
    var products=document.createElement("div");
    products.classList.add("products", "row", "d-flex", "flex-row", "justify-content-center","mt-3");
    data.forEach((element) => {
    
        let cardcol=document.createElement("div");
        cardcol.classList.add(`${element.category}`,"cardcol","mb-5","ms-3","ms-sm-0","col-11","col-sm-5", "col-md-3","flex-row","justify-content-center","justify-self-center");

        let card=document.createElement("div");
        card.classList.add("card" ,"col","h-md-75","h-100","h-md-100","ms-2");

        let image=document.createElement("div");
        image.classList.add("image","h-75","position-relative");

        let img_div=document.createElement("div");
        img_div.classList.add("img_div","h-100");
        let card_img=document.createElement("img");
        card_img.classList.add("card-img", "position-relative", "h-100");
        card_img.setAttribute("src",element.image);
        card_img.addEventListener("click",()=>{
            console.log(element);
            window.open("product_details.html","_self");
            let keys=Object.keys(element);
            let values=Object.values(element);
            for(var i=0;i<keys.length;i++)
            {
                document.cookie=`${keys[i]}=${values[i]}`;
            }
            
        })
        img_div.append(card_img);

        let cartadd=document.createElement("button");
        cartadd.setAttribute("id",`${element.id}`);
        cartadd.classList.add("cartadd", "position-absolute", "top-100" ,"end-0",   "ms-4", "translate-middle","text-center","flex-row","justify-content-center","align-content-center");
        cartadd.innerHTML="<i class='fa-solid fa-plus '></i>";
        cartadd.addEventListener("click",cartincrease);
        if(localStorage.cartelements.includes(element.id))
        {
            cartadd.style.display="none";
            localStorage.setItem(element.id,1);
        }
        else
        {
            cartadd.style.display="flex";
        }

        let incart=document.createElement("label");
        incart.setAttribute("id",`${element.id}`);
        incart.classList.add("incart", "position-absolute", "top-100" ,"end-0",   "ms-4","p-2","px-3","me-0","bg-danger","text-white","fw-bold", "translate-middle","text-center","flex-row","justify-content-center","align-content-center");
        incart.innerHTML="In Cart";
        if(localStorage.cartelements.includes(element.id))
        {
            console.log(element.id);
            // console.log(index);
            incart.style.display="flex";
        }
        else
        {
            incart.style.display="none";
        }

        image.append(img_div,cartadd,incart);

        let card_body=document.createElement("div");
        card_body.classList.add("card-body","h-25","mt-1",'m-0',"p-1","ps-2","pt-3");

        let productName=document.createElement("p");
        productName.innerText=element.name;
        productName.classList.add("productName","fw-bold","m-0","text-nowrap");
        let productPrice=document.createElement("p");
        productPrice.innerText=element.price+"$";
        productPrice.classList.add("productPrice","fw-bold","text-primary-emphasis");
        card_body.append(productName,productPrice);

        card.append(image,card_body);
        cardcol.append(card);
        products.append(cardcol);
        categories.append(products);
    
        
    });   
}
getData();
var products=document.getElementsByClassName("cardcol");

console.log(products);
function clothes()
{
    console.log(products[0].classList[0]);
    for(var i=0;i<products.length;i++)
    {
        
        if(products[i].classList[0]!="clothes")
        {
            products[i].style.display="none";
        }
        else
        {
            products[i].style.display="flex";
        }
    }
    
    
}
function jewelry()
{
    for(var i=0;i<products.length;i++)
    {
        
        if(products[i].classList[0]!="jewelry")
        {
            products[i].style.display="none";
        }
        else
        {
            products[i].style.display="flex";
        }
    }
    
}
function phones()
{
    for(var i=0;i<products.length;i++)
    {
        
        if(products[i].classList[0]!="phones")
        {
            products[i].style.display="none";
        }
        else
        {
            products[i].style.display="flex";
        }
    }
}
function makeup()
{
    for(var i=0;i<products.length;i++)
    {
        
        if(products[i].classList[0]!="makeup")
        {
            products[i].style.display="none";
        }
        else
        {
            products[i].style.display="flex";
        }
    }
}
function All()
{
    for(var i=0;i<products.length;i++)
    {
        products[i].style.display="flex";
        
    }
}

function productDetails(e)
{
    console.log(e);
}
