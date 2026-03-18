
/**
 * @param {Object} product
 * 
 * valida con el MAP si el producto ya esta en el carrito
 * Si ya existe lo incrementa en 1
 * Si no existe lo agrega desde 0 con quantity en 1
 * 
*/

const cart = new Map();

function formatMoney(value){
    return `$${Number(value).toFixed(2)}`;
}

function updateCartUI(){
    const cartContainer = document.querySelector('.container__cart');
    if(!cartContainer) return;

    const cartCountSpan = cartContainer.querySelector('.cart__number span');
    const placeholder = cartContainer.querySelector('.placeholder');
    const addedItems = cartContainer.querySelector('.added__items');
    const itemsList = cartContainer.querySelector('.items');
    const totalEl = cartContainer.querySelector('.total');

    if(!cartCountSpan || !placeholder || !addedItems || !itemsList || !totalEl) return;

    const cartItems = Array.from(cart.entries());
    const totalCount = cartItems.reduce((sum, [, item]) => sum + item.quantity, 0);

    cartCountSpan.textContent = String(totalCount);

    if(cartItems.length === 0){
        cartContainer.dataset.state = 'idle';
        placeholder.hidden = false;
        addedItems.hidden = true;
        itemsList.innerHTML = '';
        totalEl.textContent = formatMoney(0);
        return;
    }

    cartContainer.dataset.state = 'active';
    placeholder.hidden = true;
    addedItems.hidden = false;

    itemsList.innerHTML = cartItems.map(([id, item]) => {
        const lineTotal = item.price * item.quantity;
        return `
          <li class="item__cart" data-id="${id}">
            <p class="added__title">${item.name}</p>
            <div class="quantity__price--cart">
              <p class="quantity"><span aria-live="polite">${item.quantity}</span>x</p>
              <p class="price">@${formatMoney(item.price)}</p>
              <p class="quantity__price">${formatMoney(lineTotal)}</p>
            </div>
            <button class="remove__product" aria-label="Remove product">
              <img src="/assets/images/icon-remove-item.svg" alt="">
            </button>
          </li>
        `;
    }).join('');

    totalEl.textContent = formatMoney(getCartTotal());
}

export function addToCart(product){



    if(cart.has(product.id)){
        let quantity = cart.get(product.id).quantity;
        cart.set(product.id, {...cart.get(product.id), quantity: quantity + 1  } );
    }else{
        cart.set(product.id, {
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image.thumbnail
        })
    }
    
    updateCartUI();
}


/**
 * 
 * @param {number} id 
 * 
 * Elimina el producto del carrito
 * 
 */

export function removeFromCart(id){
    
    cart.delete(id)
    updateCartUI();
    
}

/**
 * 
 * @returns cart
 * 
 * Retorna el carrito completo
 * 
 */

export function getCart(){
    
    return cart;
    
}

/**
 * 
 * @param {number} id 
 * 
 * Incrementa en 1 la cantidad del producto en el carrito
 * 
 */
export function incrementQuantity(id){
    
    if(!cart.has(id)) return;

    let quantity = cart.get(id).quantity;
    cart.set(id, {...cart.get(id), quantity: quantity + 1  } );
    updateCartUI();

}

/**
 * 
 * @param {number} id
 * 
 * Si el Producto ya existe va decrementando el producto en 1
 * Si el producto esta en 1 a la siguiente elimina el producto del carrito
 *  
 */

export function decrementQuantity(id){

    
    if(cart.has(id)){
        let quantity = cart.get(id).quantity;
        if(quantity > 1){
            cart.set(id, {...cart.get(id), quantity : quantity - 1 });
        }else{
            removeFromCart(id);
        }
    }
    updateCartUI();
}

/**
 * 
 * @returns sumCart
 * 
 * iterea por cada producto y al final lo que hace es la multiplicacion de la cantidad de los
 * productos por el costo del producto
 * 
 */

export function getCartTotal(){
    
    let sumCart = 0
    
    for( let item of cart.values()){
        sumCart += item.price * item.quantity;
    }
    return sumCart;
}

/**
 *  Limpia el carrito
 */

export function clearCart(){

    cart.clear();
    updateCartUI();

}

export function renderCart(){
    updateCartUI();
}
