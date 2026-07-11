import '/src/css/style.css';

// =======================
// FAQ ACCORDION
// =======================

const faqItems = document.querySelectorAll(".faq__item");


faqItems.forEach(item => {

    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");


    question.addEventListener("click", () => {


        const isActive = item.classList.contains("active");


        // закрываем все открытые
        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer = otherItem.querySelector(".faq__answer");

            otherAnswer.style.maxHeight = null;

        });


        // открываем выбранный
        if(!isActive){

            item.classList.add("active");

            answer.style.maxHeight =
            answer.scrollHeight + "px";

        }


    });


});

// 


gsap.registerPlugin(ScrollTrigger);


// =======================
// HERO ANIMATION
// =======================

const heroTimeline = gsap.timeline({
    defaults: {
        duration: 1,
        ease: "power3.out"
    }
});


heroTimeline
.from(".hero-title", {
    y: 60,
    opacity: 0
})

.from(".hero-text", {
    y: 40,
    opacity: 0
}, "-=0.6")

.from(".hero-btn", {
    y: 30,
    opacity: 0
}, "-=0.5")

.from(".hero-image", {
    scale: 0.95,
    opacity: 0
}, "-=0.6");



// =======================
// SECTION REVEAL
// =======================

const sections = document.querySelectorAll("section");


sections.forEach(section => {

    gsap.from(section, {

        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },

        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"

    });

});



// =======================
// CARDS ANIMATION
// =======================

const cards = document.querySelectorAll(
    ".service-card, .case-card, .framework-card"
);


cards.forEach((card, index)=>{

    gsap.from(card, {

        scrollTrigger:{
            trigger:card,
            start:"top 85%"
        },

        y:40,
        opacity:0,
        duration:.7,
        delay:index * 0.12,
        ease:"power2.out"

    });

});



// =======================
// IMAGE REVEAL
// =======================

const images = document.querySelectorAll(
    ".section-image img"
);


images.forEach(img=>{

    gsap.from(img,{

        scrollTrigger:{
            trigger:img,
            start:"top 90%"
        },

        scale:1.1,
        opacity:0,
        duration:1,
        ease:"power3.out"

    });

});



// =======================
// BUTTON HOVER
// =======================

const buttons = document.querySelectorAll("button, .btn");


buttons.forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        gsap.to(btn,{
            scale:1.04,
            duration:.25,
            ease:"power2.out"
        });

    });


    btn.addEventListener("mouseleave",()=>{

        gsap.to(btn,{
            scale:1,
            duration:.25
        });

    });

});

// =======================
// SMOOTH SCROLL
// =======================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

        }

    });

});


// =======================
// NAVBAR SCROLL EFFECT
// =======================

const navbar = document.querySelector(".navbar");


window.addEventListener("scroll",()=>{

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


//  navbar scroll effect for header

const header = document.querySelector(".header");


window.addEventListener("scroll", ()=>{


    if(window.scrollY > 50){

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


});