document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('overlay');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  const mainImage = document.getElementById('mainImage');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox .prev');
  const lightboxNext = document.querySelector('.lightbox .next');
  const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnails .thumb-wrapper');
  const pageThumbnails = document.querySelectorAll('.thumbnails .thumb-wrapper');
  const images = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
  ];

  let currentIndex = 0;

  function updateImage(index, targetImage, thumbs) {
    const fullSrc = images[index];
    if (targetImage) targetImage.src = fullSrc;

    thumbs.forEach((wrapper, i) => {
      wrapper.classList.toggle('active', i === index);
    });
  }

  // === Main thumbnails update ===
  pageThumbnails.forEach((wrapper, index) => {
    wrapper.addEventListener('click', () => {
      currentIndex = index;
      updateImage(currentIndex, mainImage, pageThumbnails);
    });
  });

  // === Lightbox thumbnails update ===
  lightboxThumbnails.forEach((wrapper, index) => {
    wrapper.addEventListener('click', () => {
      currentIndex = index;
      updateImage(currentIndex, lightboxImage, lightboxThumbnails);
    });
  });

  // === Lightbox show ===
  if (mainImage) {
    mainImage.addEventListener('click', () => {
      if (window.innerWidth >= 800) {
        lightbox.classList.remove('hidden');
        document.body.classList.add('lightbox-active');
        updateImage(currentIndex, lightboxImage, lightboxThumbnails);
      }
    });
  }

  // === Lightbox close ===
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      document.body.classList.remove('lightbox-active');
    });
  }

  // === Main nav arrows ===
  document.querySelector('.arrow.prev')?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex, mainImage, pageThumbnails);
  });

  document.querySelector('.arrow.next')?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex, mainImage, pageThumbnails);
  });

  // === Lightbox nav arrows ===
  lightboxPrev?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex, lightboxImage, lightboxThumbnails);
  });

  lightboxNext?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex, lightboxImage, lightboxThumbnails);
  });

  // === Cart functionality ===
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

  addToCartBtn.addEventListener('click', () => {
    const count = parseInt(countDisplay.textContent);
    if (count === 0) return;

    cartQuantity = count;
    updateCart();
  });

  const cartBadgeDesktop = document.getElementById('cart-badge-d');
  const cartBadgeMobile = document.getElementById('cart-badge-m');

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

    cartBadgeMobile.textContent = cartQuantity;
    cartBadgeMobile.classList.remove('hidden');

    cartBadgeDesktop.textContent = cartQuantity;
    cartBadgeDesktop.classList.remove('hidden');

    cartContent.querySelector('.delete-btn').addEventListener('click', () => {
      cartQuantity = 0;
      countDisplay.textContent = '0';
      updateCart();
    });
  }
});