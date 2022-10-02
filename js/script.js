"use strict";

let menuBtn = document.querySelector("#menu-btn");
let vertNav = document.querySelector("#vertical-nav");
menuBtn.addEventListener("click", () => {
    vertNav.classList.toggle("display-none");
});