function initSliderIndex() {
    $('.index .index__slider').each(function(index, element) {
        let slider = new Swiper(element, {
            slidesPerView: 1.75,
            spaceBetween: 12,
            loop: true,
        });
    });
}

$(document).ready(function(){
    if(window.innerWidth <= 666) {
        initSliderIndex()
    }
})