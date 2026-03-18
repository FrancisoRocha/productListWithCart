# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://product-list-with-cart-orcin-five.vercel.app/). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./design/preview.jpg)

### Links

- Solution URL: [Product List with cart](https://github.com/FrancisoRocha?tab=repositories)
- Live Site URL: [Product list with cart](https://product-list-with-cart-orcin-five.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript (ES Modules)
- Native `<dialog>` element

### What I learned

**Using a `Map` for cart state**

One of the biggest learnings was using a `Map` to manage the cart instead of a plain array. It makes lookups by product ID instant and keeps the logic clean:

```js
const cart = new Map();
cart.set(product.id, { name, price, quantity, image });
```

**Event delegation**

Instead of adding a click listener to every button, I learned to attach a single listener to the parent container and use `e.target.closest()` to identify which element was clicked:

```js
containerProducts.addEventListener("click", (e) => {
    const incBtn = e.target.closest('.increment');
    if(incBtn) incrementQuantity(id);
});
```

**JavaScript ES Modules**

I split the app into separate files (`api.js`, `cart.js`, `modal.js`, `productRenderer.js`, `app.js`) and used `import`/`export` to connect them. This kept each file focused on one responsibility.

**The native `<dialog>` element**

I learned that HTML has a built-in element for modals with its own methods:

```js
modal.showModal(); // opens with backdrop
modal.close();     // closes it
```

No need for CSS hacks to block the background — the browser handles it natively.

### Continued development

In future projects I want to keep practicing:

- **Accessibility** — keyboard navigation and ARIA attributes to make interactive elements fully accessible
- **CSS animations** — I used some transitions but want to get more comfortable with keyframe animations
- **State management patterns** — the `Map` approach worked well here, and I want to explore how this scales in larger projects
- **Local storage** — persisting cart state so it survives a page refresh

### AI Collaboration

I used **Claude** as a learning mentor throughout this project. Rather than giving me answers directly, it guided me through questions and hints.

Some examples of how it helped:

- When I wasn't sure how to access cart data for the modal, instead of telling me the answer it asked: *"There's a function whose name starts with `get`... do you see it?"* — which led me to find `getCart()` myself
- When I had bugs (like `item.image.thumbnail` instead of `item.image`, or a missing `export` on `formatMoney`), it pointed me to the specific line and explained *why* it was wrong rather than just fixing it
- It explained concepts like event delegation, the `<dialog>` element, and ES Modules with the reasoning behind them, not just the syntax

This approach helped me actually understand the code I was writing instead of just copying solutions.

## Author

- Frontend Mentor - [@FrancisoRocha](https://www.frontendmentor.io/profile/FrancisoRocha)
- GitHub - [@FrancisoRocha](https://github.com/FrancisoRocha)
