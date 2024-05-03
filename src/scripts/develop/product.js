function initProductSlider(){
    $('.product__related .index__slider').each(function(index, element) {
        let slider = new Swiper(element, {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: $(element).closest('.product__related-block').find('.swiper-button-next')[0],
                prevEl: $(element).closest('.product__related-block').find('.swiper-button-prev')[0],
            },
            pagination: {
                el: $(element).closest('.product__related-block').find('.product__related-pagination')[0],
                clickable: true
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.8,
                    spaceBetween: 12,
                },
                666: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }
        });
    });


    const sliderProductThumbnail = new Swiper('.product__slider-thumbnail', {
        slidesPerView: 8,
        freeMode: true,
        spaceBetween:10,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            0: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            667: {
                slidesPerView: 8,
                spaceBetween: 10
            },
        }

    });


    const sliderProduct = new Swiper('.product__slider', {
        pagination: {
            el: '.product__pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.product__next',
            prevEl: '.product__prev',
        },
        thumbs: {
            swiper: sliderProductThumbnail
        }
    });
}

function showMoreInfo(){
    $(document).on('click','.product__specifics-more', function (){
        let wrap = $(this).closest('.product__specifics')
        wrap.toggleClass('active')
        if(wrap.hasClass('active')){
            $(this).text('Hide')
        } else{
            $(this).text('Show all')
        }
    })
}

function addProductToCart(){
    $(document).on('click','.product__add', function (){
        let product_id = $(this).closest('.product').data('id')
        let count = $('.product__counter input').val()
        let obj = {action:'add-to-cart', product_id, count}
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
                funcSuccess(res)
            },
            error: function (error) {
                console.log('error ajax');
                funcError(error)
            },
        });
    })
}

$(document).ready(function(){
    initProductSlider();
    showMoreInfo();
    addProductToCart();
})