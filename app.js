document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    const mainImage = document.getElementById("mainImage");
    const images = [
        "./images/image-product-1.jpg",
        "./images/image-product-2.jpg",
        "./images/image-product-3.jpg",
        "./images/image-product-4.jpg",
    ];

    mainImage.addEventListener('click', () => {
        lightbox.classList.remove('hidden');
        document.body.classList.add('lightbox-active');
    })

    let currentIndex = 0;

    function showImage(index) {
        mainImage.src = images[index];
    }

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.querySelector(".lightbox-close");
    const lightboxPrev = document.querySelector("lightbox .prev");
    const lightboxNext = document.querySelector("lightbox .next");
    const lightboxThumbnails = document.querySelectorAll(".lightbox-thumbnails img");


    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            document.body.classList.remove('lightbox-active');
        });
    }

    if (lightboxThumbnails && lightboxThumbnails.length > 0) {
        lightboxThumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                currentIndex = index;
                showLightboxImage(currentIndex);
            });
        });

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentIndex = (currentIndex -1 + images.length) % images.length;
            showLightboxImage(currentIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showLightboxImage(currentIndex);
        });
    }

    }
    function showLightboxImage(index) {
        lightboxImage.src = images[index];
        lightboxThumbnails.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === index);
        });
    }

    mainImage.addEventListener("click", () => {
        if (window.innerWidth >= 800) {
            lightbox.classList.remove("hidden");
            showLightboxImage(currentIndex);
        }
    });

    document.querySelector(".arrow.prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
    });

    document.querySelector(".arrow.next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    const cartButtons = document.querySelectorAll('.cart');
    const cartPopup = document.getElementById('cart-popup');
    const cartContent = document.getElementById('cart-content');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const countDisplay = document.getElementById('count');
    let cartQuantity = 0;

    cartButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isNowHidden = cartPopup.classList.toggle('hidden');
            addToCartBtn.disabled = !isNowHidden;
        });
    });

    document.getElementById('plus').addEventListener('click', () => {
        let count = parseInt(countDisplay.textContent);
        countDisplay.textContent = ++count;
    });

    document.getElementById('minus').addEventListener('click', () => {
        let count = parseInt(countDisplay.textContent);
        if (count > 0) countDisplay.textContent = --count;
    });

    addToCartBtn.addEventListener('click', ()=> {
        // console.log('Add to cart clicked!');
        const count = parseInt(countDisplay.textContent);
        if (count === 0) return;

        cartQuantity = count;
        updateCart();
    });

    const cartBadgeDesktop = document.getElementById('cart-badge-d');
    const cartBadgeMobile= document.getElementById('cart-badge-m');

    function updateCart() {
        cartContent.innerHTML = '';

        if (cartQuantity === 0) {
            cartContent.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
            checkoutBtn.classList.add('hidden');
            cartBadgeDesktop?.classList.add('hidden');
            cartBadgeMobile?.classList.add('hidden');
            return;
        }

        const price = 125.00;
        const total = price * cartQuantity;

        const itemHTML = `
            <div class="cart-item">
                <img src="./images/image-product-1-thumbnail.jpg" class="thumbnail" alt="Product thumbnail" />
                <div class="cart-item-details">
                    <span>Fall Limited Edition Sneakers</span>
                    <span>$${price.toFixed(2)} x ${cartQuantity} <strong>$${total.toFixed(2)}</strong></span>
                </div>
                <button class="delete-btn" aria-label="Remove from cart">
                    <img src="./images/icon-delete.svg" alt="Delete" />
                </button>
            </div>
        `;

        cartContent.innerHTML = itemHTML;
        checkoutBtn.classList.remove('hidden');

        if (cartBadgeMobile) {
            cartBadgeMobile.textContent = cartQuantity;
            cartBadgeMobile.classList.remove('hidden');
        }

        if (cartBadgeDesktop) {
            cartBadgeDesktop.textContent = cartQuantity;
            cartBadgeDesktop.classList.remove('hidden');
        }
       
        
        // console.log('Badge updated:', cartBadge.textContent, cartBadge.classList);

        cartContent.querySelector('.delete-btn').addEventListener('click',() => {
            cartQuantity = 0;
            countDisplay.textContent = '0';
            updateCart();
        });
    }

    document.addEventListener('click', function (e) {
        const isCartClick = e.target.closest('.cart') !== null;
        const isPopupClick = e.target.closest('#cart-popup') !== null;

        if (!isCartClick && !isPopupClick) {
            cartPopup.classList.add('hidden');
            addToCartBtn.disabled = false;
        }
    })
});