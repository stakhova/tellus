function initSliderIndex() {
    $('.index .index__slider').each(function(index, element) {
        let slider = new Swiper(element, {
            slidesPerView: 1.25,
            spaceBetween: 17,
            loop: true,
        });
    });
}

$(document).ready(function(){
    if(window.innerWidth <= 666) {
        initSliderIndex()
    }
})