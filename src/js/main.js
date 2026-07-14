import '/src/css/style.css';

// =======================
// FAQ ACCORDION
// =======================

const faqItems = document.querySelectorAll(".faq__item");


faqItems.forEach((item, index) => {

    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");



    question.type = "button";

    question.id = `faq-question-${index + 1}`;

    question.setAttribute("aria-expanded", "false");

    question.setAttribute("aria-controls", `faq-answer-${index + 1}`);

    answer.id = `faq-answer-${index + 1}`;

    answer.setAttribute("role", "region");

    answer.setAttribute("aria-labelledby", question.id);

    answer.setAttribute("aria-hidden", "true");


    question.addEventListener("click", () => {


        const isActive = item.classList.contains("active");


        // закрываем все открытые
        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer = otherItem.querySelector(".faq__answer");

            const otherQuestion = otherItem.querySelector(".faq__question");

            otherAnswer.style.maxHeight = null;

            otherQuestion.setAttribute("aria-expanded", "false");

            otherAnswer.setAttribute("aria-hidden", "true");

        });


        // открываем выбранный
        if(!isActive){

            item.classList.add("active");

            question.setAttribute("aria-expanded", "true");

            answer.setAttribute("aria-hidden", "false");

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

// =======================
// HERO ANIMATION
// =======================

// =======================
// HERO ANIMATION
// =======================


const heroTimeline = gsap.timeline({

    defaults:{
        ease:"power2.out"
    }

});


heroTimeline


.from(".hero__label",{

    opacity:0,

    y:12,

    duration:.7

})


.from(".hero__title",{

    opacity:0,

    y:18,

    duration:.9

},"-=0.45")


.from(".hero__text",{

    opacity:0,

    y:16,

    duration:.8

},"-=0.55")


.from(".hero__actions",{

    opacity:0,

    y:14,

    duration:.8

},"-=0.55")


// Dashboard появление

.from(".dashboard-card",{

    opacity:0,

    y:30,

    scale:.96,

    stagger:.15,

    duration:1,

    ease:"power3.out"

},"-=0.8");





// =======================
// HERO DASHBOARD FLOAT
// =======================

const isDesktop = window.innerWidth >= 1100;


if(isDesktop){
gsap.to(".dashboard-card--main",{

    y:-10,

    rotation:.4,

    duration:7,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});



gsap.to(".dashboard-card--metric",{

    y:-12,

    rotation:1,

    duration:6,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});




gsap.to(".dashboard-card--progress",{

    y:8,

    rotation:-1,

    duration:8,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});


}


// =======================
// MOUSE PARALLAX
// =======================

//
// HERO DASHBOARD MOUSE PARALLAX
//

const heroDashboard = document.querySelector(".hero-dashboard");


if(heroDashboard){

    gsap.set(heroDashboard,{
        transformPerspective:1500
    });

    heroDashboard.addEventListener("mousemove", (e)=>{


        const rect = heroDashboard.getBoundingClientRect();


        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;



const moveX = (x - rect.width / 2) / 45;
const moveY = (y - rect.height / 2) / 45;



        gsap.to(heroDashboard,{

            rotateY: moveX,

            rotateX: -moveY,

            duration:1.4,

            ease:"power3.out",

            transformPerspective:1000

        });



        


    });





    heroDashboard.addEventListener("mouseleave",()=>{


        gsap.to(heroDashboard,{

            rotateY:0,

            rotateX:0,

            duration:1.8,

            ease:"power3.out"

        });


    });



}

// =======================
// SECTION REVEAL
// =======================

const sections = document.querySelectorAll(
    ".section"
);

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

const buttons = document.querySelectorAll(
    ".button, button"
);


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



//  navbar scroll effect for header

const header = document.querySelector(".header");

const logo = document.querySelector(".logo");


window.addEventListener("scroll", ()=>{


    if(window.scrollY > 50){

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }


});

// =======================
// MOBILE MENU
// =======================


const menuButton = document.querySelector(".menu-button");

const mobileMenu = document.querySelector(".mobile-menu");

const mobileLinks = document.querySelectorAll(".mobile-menu__link");



function openMenu(){

    menuButton.classList.add("active");

    mobileMenu.classList.add("active");

    document.body.classList.add("menu-open");

}



function closeMenu(){

    menuButton.classList.remove("active");

    mobileMenu.classList.remove("active");

    document.body.classList.remove("menu-open");

}



if(menuButton && mobileMenu){



    // OPEN / CLOSE BUTTON

    menuButton.addEventListener("click",(e)=>{

        e.stopPropagation();


        if(mobileMenu.classList.contains("active")){

            closeMenu();

        } else {

            openMenu();

        }


    });



    // CLOSE AFTER CLICK LINK

    mobileLinks.forEach(link=>{


        link.addEventListener("click",()=>{


            closeMenu();


        });


    });



    // CLICK OUTSIDE MENU

    document.addEventListener("click",(e)=>{


        const clickedInsideMenu = mobileMenu.contains(e.target);

        const clickedButton = menuButton.contains(e.target);



        if(
            mobileMenu.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedButton
        ){

            closeMenu();

        }


    });



    // ESC CLOSE

    document.addEventListener("keydown",(e)=>{


        if(
            e.key === "Escape" &&
            mobileMenu.classList.contains("active")
        ){

            closeMenu();

        }


    });


}

// logo scroll to top

if(logo){

    logo.addEventListener("click",(e)=>{

        e.preventDefault();


        closeMenu();


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });

}

// =======================
// CONTACT FORM
// =======================

const contactForm = document.querySelector("#contact-form");

const emailJsConfig = {
    publicKey: "kznunU3tJkXsbyvxr",
    serviceId: "service_zd1da7s",
    templateId: "template_kjv7cy2"
};



function setFieldError(field, message){

    const fieldWrapper = field.closest(".contact__field");

    const errorElement = document.querySelector(`#${field.id}-error`);



    if(!fieldWrapper || !errorElement){

        return;

    }



    fieldWrapper.classList.toggle("is-invalid", Boolean(message));

    field.setAttribute("aria-invalid", String(Boolean(message)));

    errorElement.textContent = message;

}



function getFieldError(field){

    if(!field.value.trim()){

        return "Este campo es obligatorio.";

    }



    if(field.type === "email" && !field.validity.valid){

        return "Introduce un correo electrónico válido.";

    }



    return "";

}



function setFormStatus(statusElement, state, message){

    statusElement.dataset.state = state;

    statusElement.textContent = message;

    statusElement.hidden = false;

}



if(contactForm){

    const contactFields = contactForm.querySelectorAll("input, textarea, select");

    const submitButton = contactForm.querySelector("button[type=\"submit\"]");

    const submitLabel = contactForm.querySelector(".contact__submit-label");

    const formStatus = contactForm.querySelector(".contact__form-status");



    contactFields.forEach(field => {

        field.addEventListener("input", () => {

            setFieldError(field, getFieldError(field));

        });



        field.addEventListener("change", () => {

            setFieldError(field, getFieldError(field));

        });

    });



    if(typeof emailjs !== "undefined"){

        emailjs.init({ publicKey: emailJsConfig.publicKey });

    }



    contactForm.addEventListener("submit", async event => {

        event.preventDefault();



        const hasErrors = Array.from(contactFields).some(field => {

            const errorMessage = getFieldError(field);

            setFieldError(field, errorMessage);

            return Boolean(errorMessage);

        });



        if(hasErrors){

            setFormStatus(formStatus, "error", "Revisa los campos marcados antes de enviar.");

            return;

        }



        if(typeof emailjs === "undefined"){

            setFormStatus(formStatus, "error", "No se pudo cargar el servicio de envío. Inténtalo de nuevo más tarde.");

            return;

        }



        submitButton.disabled = true;

        submitButton.setAttribute("aria-busy", "true");

        submitLabel.textContent = "Enviando…";

        formStatus.hidden = true;



        try {

            await emailjs.sendForm(
                emailJsConfig.serviceId,
                emailJsConfig.templateId,
                contactForm
            );



            contactForm.reset();

            contactFields.forEach(field => setFieldError(field, ""));

            setFormStatus(formStatus, "success", "¡Gracias! Hemos recibido tu solicitud y te responderemos pronto.");

        } catch(error){

            setFormStatus(formStatus, "error", "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos minutos.");

        } finally {

            submitButton.disabled = false;

            submitButton.removeAttribute("aria-busy");

            submitLabel.textContent = "Enviar solicitud";

        }

    });

}
