import { loadProducts } from "./api.js";


export async function productRender() {

    //Seleccionar el contenedor de los productos
    const containerProducts = document.querySelector('.product__container');
    
    const products = await loadProducts();

    containerProducts.innerHTML = products.map((product) => {
        const { image: { mobile,tablet,desktop }, name, category, price, id } = product;

        return `<!-- ITEM -->
        <li class="product__item" data-id="${id}">
            <!-- IMAGEN PRODUCT -->
            <div class="item__img">
                <picture>
                    <!-- DESKTOP -->
                    <source
                        srcset="${desktop}"
                        media="(min-width: 1440px)"
                    >
                    <!-- TABLET -->
                    <source
                        srcset="${tablet}"
                        media="(min-width: 768px)"
                    >
                    <!-- MOBILE -->
                    <img src="${mobile}" class="img__product" alt="${name}"/>
                </picture>
                <!-- BUTTON ADD TO CART -->
                <div class="button__cart" data-state="idle">
                    <div class="add__cart">
                        <button class="btn__add__cart" aria-label="Add to cart">
                            <img src="/assets/images/icon-add-to-cart.svg" alt="">
                            <span class="addCart">Add to Cart</span>
                        </button>
                    </div>
                    <div class="count__btn">
                        <button class="decrement" aria-label="Decrease quantity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                                <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/>
                            </svg>
                        </button>
                        <span class="count" aria-live="polite">1</span>
                        <button class="increment" aria-label="Increase quantity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                                <path fill="currentColor" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- INFO PRODUCT -->
            <div class="item__info">
                <p class="item__name">${category}</p>
                <p class="item__nameProduct">${name}</p>
                <p class="item__price">$${price}</p>
            </div>
        </li>`;
    }).join('');
}







