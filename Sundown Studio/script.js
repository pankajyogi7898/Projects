const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

// var elem_cont = document.querySelector("#elem-container")
// var fix = document.querySelector("#fixed-img")


// elem_cont.addEventListener("mouseenter", function () {
//     fix.style.display = "block";
// })
// elem_cont.addEventListener("mouseleave", function () {
//     fix.style.display = "none";
// })

// // var elem1 = document.querySelector("#elem1")

// var elem = document.querySelectorAll(".elem")
// elem.forEach(function (e) {
//     e.addEventListener("mouseenter", function () {
//         var img = e.getAttribute("data-image")
//         fix.style.backgroundImage = `url(${img})`
//     })
// })

// Swiper function
function swiperAnimation() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}
swiperAnimation()
