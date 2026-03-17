
/**
 * @param {Object} product
 * 
 * valida con el MAP si el producto ya esta en el carrito
 * Si ya existe lo incrementa en 1
 * Si no existe lo agrega desde 0 con quantity en 1
 * 
*/

const cart = new Map();

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
    
}


/**
 * 
 * @param {number} id 
 * 
 * Elimina el producto del carrito
 * 
 */

function removeFromCart(id){
    
    cart.delete(id)
    
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
    
    let quantity = cart.get(id).quantity;
    cart.set(id, {...cart.get(id), quantity: quantity + 1  } );

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

}
