

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
let currentIndex = 0;

function showImage(index) {
    mainImage.src = overlay,ages[index];
}

document.querySelector(".arrow.prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
});

document.querySelector(".arrow.next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});