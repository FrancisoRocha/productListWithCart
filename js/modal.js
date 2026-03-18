import { formatMoney, getCart, getCartTotal } from "./cart.js";


export function openModal() {

    const modal = document.querySelector('#modal');

    //Obtener los items del carrito
    const containerModal = document.querySelector('.confirmed__item');
    const totalPrice = document.querySelector('.price__products__item');

    if(!modal || !containerModal || !totalPrice) return;

    const totalGeneral = getCartTotal();
    const productModal = Array.from(getCart().entries());

    containerModal.innerHTML = productModal.map(([id, item]) => {
        const totalItems = item.price * item.quantity;
        return `
            <li class="item__container__products" data-id="${id}">
            <div class="item__products__img">
                <img src="${item.image}" alt="Product confirmed">
            </div>
            <div class="item__products__info">
                <p class="item__product">${item.name}</p>
                <div class="item__quantity__price">
                <p class="item__product__number"><span>${item.quantity}</span>x</p>
                <p class="item__product__price">@${formatMoney(item.price)}</p>
                </div>
            </div>
            <div class="item__product__total">
                <p class="product__total">${formatMoney(totalItems)}</p>
            </div>
            </li>
            `;
        }).join('')
        
    totalPrice.textContent = formatMoney(totalGeneral);
    modal.showModal();
}

export function playCelebration(){
    // Confetti layer
    const layer = document.createElement('div');
    layer.className = 'confetti-layer';

    const pieces = 90;
    for(let i = 0; i < pieces; i++){
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.style.setProperty('--x', String(Math.random() * 100));
        piece.style.setProperty('--h', String(Math.floor(Math.random() * 360)));
        piece.style.setProperty('--r', String(Math.floor(Math.random() * 360)));
        piece.style.setProperty('--d', String(1200 + Math.floor(Math.random() * 900))); // ms
        piece.style.setProperty('--delay', String(Math.floor(Math.random() * 250))); // ms
        layer.appendChild(piece);
    }

    // Toast
    const toast = document.createElement('div');
    toast.className = 'confetti-toast';
    toast.textContent = '¡Order confirmed!';

    document.body.appendChild(layer);
    document.body.appendChild(toast);

    window.setTimeout(() => {
        layer.remove();
        toast.remove();
    }, 2200);
}


export function closeModal(){
    const modal = document.querySelector("#modal");
    const containerModal = document.querySelector('.confirmed__item');
    const totalPrice = document.querySelector('.price__products__item');

    if(modal && modal.open){
        modal.close();
    }

    // Limpieza visual del modal para un nuevo pedido
    if(containerModal){
        containerModal.innerHTML = '';
    }
    if(totalPrice){
        totalPrice.textContent = formatMoney(0);
    }
}

