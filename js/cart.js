let prodarray=[];
let subTotal=0;

if(localStorage.cartelements)
{
    prodarray=localStorage.cartelements.replace(',','').split(',');
}else
{
    localStorage.cartelements='';
}
console.log(prodarray);
let element=document.getElementsByClassName("addedprod")[0];
document.getElementsByClassName("addedprod")[0].remove();

function opencart()
{
    document.open("cart.html","_self");
}


async function getData()
{
    let response=await fetch("http://localhost:3000/products");
    let data=await response.json();
    await cartproducts(data);
}

async function cartproducts(data)
{
    let cartproducts=document.getElementsByClassName("cartproducts")[0];
    prodarray.forEach(index => {
        let clonedElement=element.cloneNode(true);
        console.log(index);
        let product=data[index-1];
        let img=clonedElement.getElementsByClassName("prodImg")[0];
        img.setAttribute("src",product.image);

        let name=clonedElement.getElementsByClassName("prodName")[0];
        name.innerHTML=product.name;

        let price=clonedElement.getElementsByClassName("prodPrice")[0];
        price.innerHTML=product.price+'$';

        let quantity=clonedElement.getElementsByClassName("quantity")[0];
        quantity.innerHTML=localStorage.getItem(product.id);
        //subtotal
        subTotal+=(Number(quantity.textContent)*Number(product.price));
        subTotal=Math.round(subTotal*100)/100;
        console.log(subTotal);

        let subtotal=document.getElementsByClassName("subTotal")[0];
        subtotal.textContent=subTotal;
        let ship=document.getElementsByClassName("shipping")[0];
        let total=document.getElementsByClassName("total")[0];
        ship.innerHTML=100;
        total.innerHTML=Number(subTotal)+Number(ship.innerHTML);
        total.innerHTML=Math.round(total.innerHTML*100)/100;

        let plus=clonedElement.getElementsByClassName("plus")[0];
        console.log(plus);
        plus.addEventListener("click",()=>{
            if(quantity.innerHTML==product.quantity)
            {
                quantity.innerHTML=product.quantity;
            }
            else
            {
                quantity.innerHTML=++quantity.innerHTML;
            }
            localStorage.setItem(product.id,quantity.innerHTML);

        });
        let minus=clonedElement.getElementsByClassName("minus")[0];
        minus.addEventListener("click",()=>{
            if(quantity.innerHTML==1)
            {
                quantity.innerHTML=1;
            }
            else
            {
                quantity.innerHTML=--quantity.innerHTML;
            }
            localStorage.setItem(product.id,quantity.innerHTML);

            
        });

        let delproduct=clonedElement.getElementsByClassName("delProduct")[0];
        delproduct.addEventListener("click",()=>{
            --localStorage.cartNum;
            let cartNum=document.getElementsByClassName("cartNum")[0];
            cartNum.innerHTML=localStorage.cartNum;
            clonedElement.remove();
            localStorage.cartelements=localStorage.cartelements.replace(`,${index}`,'');
            localStorage.removeItem(product.id);

        })
        cartproducts.append(clonedElement);
        console.log(product);
    });
    
}
let successcheck= document.getElementsByClassName("successcheck")[0];
function checkout()
{
    if(localStorage.signed=="true")
    {
        localStorage.cartNum=0;
    
        for (var i=0; i<localStorage.length;i++)
        {
            if(localStorage.cartelements.includes(localStorage.key(i)))
            {
                localStorage.removeItem(localStorage.key(i));
            }
        }
        localStorage.cartelements='';
        location.reload();
        successcheck.style.display="flex";
        setTimeout(()=>{
            successcheck.style.display="none";
        },300000)
    }
    else
    {
        showSignin();
    }
    
}
getData();