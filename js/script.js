"use strict";

let menuBtn = document.querySelector("#menu-btn");
let vertNav = document.querySelector("#vertical-nav");
menuBtn.addEventListener("click", () => {
    vertNav.classList.toggle("display-none");
});



//--------------- Main carousel -----------------------------
const imgs = 2;
let moveX = -(100/imgs);
let cContainer = document.querySelector("#c-container");
let cNavPoints = document.querySelectorAll(".c-nav-point");

cNavPoints.forEach((point, i) => {
    cNavPoints[i].addEventListener('click', () => {
        let pos = i;
        let op = pos*(moveX);
        cContainer.style.transform = `translateX(${op}%)`;
        cNavPoints.forEach((point) => {point.classList.remove("active");});
        point.classList.add("active");     
    });
});