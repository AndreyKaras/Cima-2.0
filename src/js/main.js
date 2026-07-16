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

},"-=0.8")


.from(".dashboard-system > span",{

    opacity:0,

    scale:.7,

    stagger:.08,

    duration:.45

},"-=0.45")


.from(".dashboard-system > i",{

    scaleX:0,

    stagger:.08,

    duration:.4

},"-=0.4");





// =======================
// HERO DASHBOARD FLOAT
// =======================

const heroDashboard = document.querySelector(".hero-dashboard");
const heroMotion = gsap.matchMedia();


heroMotion.add(
    "(min-width: 1100px) and (prefers-reduced-motion: no-preference)",
    ()=>{

        if(!heroDashboard) return;

        const floatTweens = [
            gsap.to(".dashboard-card--main",{
                y:-7,
                rotation:.25,
                duration:7,
                repeat:-1,
                yoyo:true,
                ease:"sine.inOut",
                paused:true
            }),
            gsap.to(".dashboard-card--metric",{
                y:-8,
                rotation:.5,
                duration:6.5,
                repeat:-1,
                yoyo:true,
                ease:"sine.inOut",
                paused:true
            }),
            gsap.to(".dashboard-card--progress",{
                y:6,
                rotation:-.5,
                duration:8,
                repeat:-1,
                yoyo:true,
                ease:"sine.inOut",
                paused:true
            })
        ];

        const routeProgress = heroDashboard.querySelector(".dashboard-route span");
        const rotateXTo = gsap.quickTo(heroDashboard,"rotateX",{
            duration:.5,
            ease:"power2.out"
        });
        const rotateYTo = gsap.quickTo(heroDashboard,"rotateY",{
            duration:.5,
            ease:"power2.out"
        });

        let dashboardRect;
        let heroIsVisible = true;
        let introIsComplete = heroTimeline.progress() === 1;

        const setFloatState = isActive=>{
            floatTweens.forEach(tween=>{
                if(isActive && introIsComplete){
                    tween.play();
                } else {
                    tween.pause();
                }
            });

            if(routeProgress){
                routeProgress.style.animationPlayState = isActive ? "running" : "paused";
            }
        };

        const visibilityTrigger = ScrollTrigger.create({
            trigger:".hero",
            start:"top bottom",
            end:"bottom top",
            onToggle:self=>{
                heroIsVisible = self.isActive;
                setFloatState(heroIsVisible);
            }
        });

        heroTimeline.eventCallback("onComplete",()=>{
            introIsComplete = true;
            setFloatState(heroIsVisible);
        });

        setFloatState(heroIsVisible);

        const updateDashboardRect = ()=>{
            dashboardRect = heroDashboard.getBoundingClientRect();
        };

        const handlePointerMove = event=>{
            if(!dashboardRect) updateDashboardRect();

            const x = event.clientX - dashboardRect.left;
            const y = event.clientY - dashboardRect.top;
            const moveX = (x - dashboardRect.width / 2) / 65;
            const moveY = (y - dashboardRect.height / 2) / 65;

            rotateYTo(moveX);
            rotateXTo(-moveY);
        };

        const resetDashboard = ()=>{
            dashboardRect = undefined;
            rotateYTo(0);
            rotateXTo(0);
        };

        heroDashboard.addEventListener("pointerenter",updateDashboardRect);
        heroDashboard.addEventListener("pointermove",handlePointerMove,{ passive:true });
        heroDashboard.addEventListener("pointerleave",resetDashboard);

        return ()=>{
            visibilityTrigger.kill();
            floatTweens.forEach(tween=>tween.kill());
            heroDashboard.removeEventListener("pointerenter",updateDashboardRect);
            heroDashboard.removeEventListener("pointermove",handlePointerMove);
            heroDashboard.removeEventListener("pointerleave",resetDashboard);
            heroTimeline.eventCallback("onComplete",null);
            gsap.set(heroDashboard,{ clearProps:"rotateX,rotateY" });
        };

    }
);

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

            if(document.body.classList.contains("menu-open")){

                closeMenu();

            }

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


const updateHeaderScrollState = ()=>{

    if(!header) return;

    const fullScreenMenuIsOpen =
        document.body.classList.contains("menu-open") &&
        window.innerWidth <= 767;

    if(fullScreenMenuIsOpen) return;

    header.classList.toggle("scrolled",window.scrollY > 50);

};


window.addEventListener("scroll",updateHeaderScrollState);

updateHeaderScrollState();

// =======================
// MOBILE MENU
// =======================


const menuButton = document.querySelector(".menu-button");

const mobileMenu = document.querySelector(".mobile-menu");

const mobileLinks = document.querySelectorAll(".mobile-menu__link");

const fullScreenMenuMedia = window.matchMedia("(max-width: 767px)");

const desktopMenuMedia = window.matchMedia("(min-width: 1100px)");

let menuOpenedAtScrollPosition = window.scrollY;



function openMenu(){

    if(fullScreenMenuMedia.matches){

        menuOpenedAtScrollPosition = window.scrollY;

        header.classList.toggle(
            "scrolled",
            menuOpenedAtScrollPosition > 50
        );

    }

    menuButton.classList.add("active");

    mobileMenu.classList.add("active");

    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded","true");

    menuButton.setAttribute("aria-label","Cerrar menú");

    mobileMenu.setAttribute("aria-hidden","false");

}



function closeMenu(){

    const preserveHeaderState =
        fullScreenMenuMedia.matches &&
        menuOpenedAtScrollPosition > 50;

    menuButton.classList.remove("active");

    mobileMenu.classList.remove("active");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded","false");

    menuButton.setAttribute("aria-label","Abrir menú");

    mobileMenu.setAttribute("aria-hidden","true");

    if(fullScreenMenuMedia.matches){

        header.classList.toggle("scrolled",preserveHeaderState);

    } else {

        updateHeaderScrollState();

    }

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

            menuButton.focus();

        }


    });


    const closeMenuAfterViewportChange = ()=>{

        if(mobileMenu.classList.contains("active")){

            closeMenu();

        }

    };


    fullScreenMenuMedia.addEventListener(
        "change",
        closeMenuAfterViewportChange
    );


    desktopMenuMedia.addEventListener(
        "change",
        closeMenuAfterViewportChange
    );


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
// TESTIMONIALS SLIDER
// =======================

const initTestimonialsSlider = () => {

    if(!window.Swiper) return;

    const testimonialsCarousel = document.querySelector(".testimonials__carousel");

    if(!testimonialsCarousel || testimonialsCarousel.classList.contains("swiper-initialized")){

        return;

    }

    const testimonialsShell = testimonialsCarousel.closest(".testimonials__slider-shell");
    const nextButton = testimonialsShell?.querySelector("[data-testimonial-next]");
    const previousButton = testimonialsShell?.querySelector("[data-testimonial-prev]");
    const pagination = testimonialsShell?.querySelector(".testimonials__dots");

    new window.Swiper(testimonialsCarousel, {

        slidesPerView:1,

        spaceBetween:0,

        loop:true,

        speed:550,

        grabCursor:true,

        autoHeight:true,

        observer:true,

        observeParents:true,

        watchSlidesProgress:true,

        keyboard:{

            enabled:true,

            onlyInViewport:true

        },

        navigation:{

            nextEl:nextButton,

            prevEl:previousButton

        },

        pagination:{

            el:pagination,

            clickable:true,

            bulletClass:"testimonials__dot",

            bulletActiveClass:"is-active"

        },

        a11y:{

            enabled:true,

            prevSlideMessage:"Testimonio anterior",

            nextSlideMessage:"Siguiente testimonio",

            paginationBulletMessage:"Ir al testimonio {{index}}"

        }

    });

};


if(window.Swiper){

    initTestimonialsSlider();

} else {

    window.addEventListener("load", initTestimonialsSlider, { once:true });

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

    if(field.required && !field.value.trim()){

        return "Este campo es obligatorio.";

    }

    if(!field.value.trim()){

        return "";

    }



    if(field.type === "email" && !field.validity.valid){

        return "Ingresá un correo electrónico válido.";

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

            setFormStatus(formStatus, "error", "Revisá los campos marcados antes de enviar.");

            return;

        }



        if(typeof emailjs === "undefined"){

            setFormStatus(formStatus, "error", "No se pudo cargar el servicio de envío. Intentá de nuevo más tarde.");

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

            setFormStatus(formStatus, "error", "No pudimos enviar tu solicitud. Intentá de nuevo en unos minutos.");

        } finally {

            submitButton.disabled = false;

            submitButton.removeAttribute("aria-busy");

            submitLabel.textContent = "Solicitar consulta";

        }

    });

}
