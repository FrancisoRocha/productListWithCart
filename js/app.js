import { addToCart, decrementQuantity, getCart, incrementQuantity, removeFromCart, renderCart } from "./cart.js";
import { productRender } from "./productRenderer.js"


document.addEventListener('DOMContentLoaded', async() => {
    
    const productCart = await productRender();
    renderCart();

    const containerProducts = document.querySelector('.product__container');

    containerProducts.addEventListener("click", (e) => {

        // Add To Cart
        const productEvent = e.target.closest('.btn__add__cart');
        const incBtn = e.target.closest('.increment');
        const decBtn = e.target.closest('.decrement');

        const li = e.target.closest('[data-id]');
        if(!li) return;
        const id = parseInt(li.dataset.id, 10);

        // Add to cart
        if(productEvent){
            const product = productCart.find(p => p.id === id);
            if(!product) return;
            addToCart(product);
        }

        // Increment
        if(incBtn){
            console.log("increment click → id:", id, "existe en carrito?:", getCart().has(id));
            incrementQuantity(id);
        }

        // Decrement
        if(decBtn){
            decrementQuantity(id);
        }

        // Sync counter in product card UI
        if(productEvent || incBtn || decBtn){
            const countEl = li.querySelector('.count');
            const item = getCart().get(id);
            if(countEl){
                countEl.textContent = item ? String(item.quantity) : '0';
            }
        }

        //Mostrar los botos de Add to Cart || + & -
        const buttons = li.querySelector('.button__cart');
        if(!buttons) return;

        if(getCart().has(id)){
            buttons.dataset.state = "active";
        }else{
            buttons.dataset.state = "idle";
        }

    })

    //Delete Product the Container__cart
    const cartItems = document.querySelector('.items')

    cartItems.addEventListener("click", (e) => {

        const deleteBtn = e.target.closest('.remove__product');
        if(!deleteBtn) return;

        const li = e.target.closest('[data-id]');
        if(!li) return;
        const id = parseInt(li.dataset.id, 10);
        removeFromCart(id);

        // Buscar la card del producto en la lista principal y resetear su estado
        const productLi = document.querySelector(`.product__container [data-id="${id}"]`);
        if(productLi){
            const buttons = productLi.querySelector('.button__cart');
            if(buttons){
                buttons.dataset.state = "idle";
            }
            const countEl = productLi.querySelector('.count');
            if(countEl){
                countEl.textContent = '0';
            }
        }

    })


})



