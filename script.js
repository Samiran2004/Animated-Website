function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotiveAnimation();

function navbarAnimation() {
    gsap.to("#nav-part1 svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: 2,
        },
    });
    gsap.to("#nav-part2 #links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: 2,
        },
    });
}
navbarAnimation()

function videoconAnimation() {
    var videocon = document.querySelector("#video-container");
    var playbtn = document.querySelector("#play");
    videocon.addEventListener("mouseenter", function () {
        gsap.to(playbtn, {
            scale: 1,
            opacity: 1,
        });
    });
    videocon.addEventListener("mouseleave", function () {
        gsap.to(playbtn, {
            scale: 0,
            opacity: 0,
        });
    });
    document.addEventListener("mousemove", function (dets) {
        gsap.to(playbtn, {
            left: dets.x - 70,
            top: dets.y - 80,
        });
    });
}
videoconAnimation();

function loadinganimation() {
    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        stagger: 0.3,
    });
    gsap.from("#page1 #video-container", {
        scale: 0.9,
        opacity: 0,
        delay: 1.3,
        duration: 0.5,
    });
}
loadinganimation();

function cursorAnimation() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
        });
    });
    // document.querySelector("#child1").addEventListener("mouseenter",function(){

    // })

    // document.querySelector("#child1").addEventListener("mouseleave",function(){
    //   gsap.to("#cursor",{
    //     transform: 'translate(-50%,-50%) scale(0)'
    //   })
    // })
    document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to("#cursor", {
                transform: "translate(-50%,-50%) scale(1)",
            });
        });
        elem.addEventListener("mouseleave", function () {
            gsap.to("#cursor", {
                transform: "translate(-50%,-50%) scale(0)",
            });
        });
    });
}
cursorAnimation();

function imageCursorAnimation() {
    let firstImage = document.getElementById('child1');
    let secImage = document.getElementById('child2');
    let thirdImage = document.getElementById('child3');
    let fourthImage = document.getElementById('child4');
    let cursor = document.getElementById('cursor')
    firstImage.addEventListener('mouseover', function () {
        cursor.style.height = "100px";
        cursor.style.width = "100px";
        cursor.style.backgroundColor = "red";
    });
    firstImage.addEventListener('mouseout', function () {
        cursor.style.height = "50px";
        cursor.style.width = "50px";
        cursor.style.backgroundColor = "rgba(139,224,221,0.858";
    });

    secImage.addEventListener('mouseover', function () {
        cursor.style.height = "100px";
        cursor.style.width = "100px";
        cursor.style.backgroundColor = "yellow";
        cursor.style.boxShadow = "10px 10px 30px yellow";
    });
    secImage.addEventListener('mouseout', function () {
        cursor.style.height = "50px";
        cursor.style.width = "50px";
        cursor.style.backgroundColor = "rgba(139,224,221,0.858";
        cursor.style.boxShadow = "10px 10px 30px red";
    });

    thirdImage.addEventListener('mouseover', function () {
        cursor.style.height = "100px";
        cursor.style.width = "100px";
        cursor.style.backgroundColor = "sky";
        cursor.style.boxShadow = "10px 10px 30px sky";
    });
    thirdImage.addEventListener('mouseout', () => {
        cursor.style.height = "50px";
        cursor.style.width = "50px";
        cursor.style.backgroundColor = "rgba(139,224,221,0.858";
        cursor.style.boxShadow = "10px 10px 30px red";
    });

    fourthImage.addEventListener('mouseover', function () {
        cursor.style.height = "100px";
        cursor.style.width = "100px";
        cursor.style.backgroundColor = "green";
        cursor.style.boxShadow = "10px 10px 30px green";
    });
    fourthImage.addEventListener('mouseout', function () {
        cursor.style.height = "50px";
        cursor.style.width = "50px";
        cursor.style.backgroundColor = "rgba(139,224,221,0.858";
        cursor.style.boxShadow = "10px 10px 30px red";
    });
};
imageCursorAnimation();

function darkMode() {
    let darkModeBtn = document.getElementById('dark_mode_button');
    let aTag = document.querySelector("#nav-part2 #links a")
    darkModeBtn.addEventListener('mousedown', function () {
        if (document.body.style.backgroundColor == "black") {
            document.body.style.backgroundColor = "white";
            aTag.style.color = "white";
        }
        else {
            document.body.style.backgroundColor = "black";
        };
    });
};
darkMode();