let mySwiper;
function initSliderIndex() {
    $('.index .index__slider').each(function(index, element) {
        let slider = new Swiper(element, {
            slidesPerView: 1.75,
            spaceBetween: 12,
            loop: true,
        });
    });
}
function initProductSlider(){
    $('.product__related .index__slider').each(function(index, element) {
        let slider = new Swiper(element, {
            slidesPerView: 4,
            spaceBetween: 30,
            loop: true,
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
                spaceBetween: 16
            },
            1024: {
                slidesPerView: 4
            },
            1440: {
                slidesPerView: 7
            }

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

function addToFavorite(){
    $(document).on('click', '.like', function (){
        $(this).toggleClass('active')
        let to_favorite = $(this).hasClass('active') ? 'add': 'remove'
        let product_id = $(this).closest('.card__item').data('id')
        let obj = {action:'add-to-favorite', product_id, to_favorite}
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
            complete: function (){

            }
        });
    })
}




function loginFormChange(){
    $(document).on('click','.login__forget', function (){
        $(this).closest('.login__form').removeClass('active');
        $('.login__form-forget').addClass('active')
    })
    $(document).on('click','.login__remember', function (){
        $(this).closest('.login__form').removeClass('active');
        $('.login__signin').addClass('active')
    })
    $(document).on('click','.login__registration-button button', function (){
        $(this).closest('.login__form').removeClass('active');
        $('.login__registration').addClass('active')
    })
    $(document).on('click','.login__sign button', function (){
        $(this).closest('.login__form').removeClass('active');
        $('.login__signin').addClass('active')
    })
    if(window.location.href.includes('set_new_password')){
        $('.login__form').removeClass('active')
        $('.login__form-recovery').addClass('active')
    } else{
        $('.login__signin').addClass('active')
    }
}

function addActiveFilter(){
    $(document).on('click','.category__filter-option span',function (){
        // let isActive = $(this).hasClass('active');

        $(this).toggleClass('active');

        let selectedValues = [];
        $(this).closest('.category__filter-item').find('.category__filter-option span.active').each(function() {
            selectedValues.push($(this).text());
        });
        $(this).closest('.category__filter-item').find('input[type="hidden"]').val(selectedValues.join(', '));
    })
}


function changeMob() {
    if(window.innerWidth <= 666){
        initSliderIndex()
        $('.category__mob').append($('.category__select[name="sort_by"]'))
    }
}

const validateForm = (form, func) => {
    form.on("submit", function (e) {
        e.preventDefault();
    });
    $.validator.addMethod("goodMessage", function (value, element) {
        return this.optional(element) || /^[\sаА-яЯіІєЄїЇґҐa-zA-Z0-9._-]{2,100}$/i.test(value);
    }, "Please enter correct");

    $.validator.addMethod("goodEmail", function (value, element) {
        return this.optional(element) || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,62}$/i.test(value);
    }, "Please enter correct email");


    form.validate({
        rules: {
            username: {
                required: true,
                // goodMessage: true,
            },
            email: {
                required: true,
                goodEmail: true,
                email: true
            },
            password: {
                required: true,
            },
            passwordOld:{
                required: true,
                minlength: 8
            },
            passwordNew: {
                required: true,
                minlength: 8
            },
            passwordNewRepeat: {
                required: true,
                minlength: 8,
                equalTo: "#passwordNew"
            }

        },
        messages: {
            username: {
                required: "This field is required",
                email: "Please enter correct username"
            },
            email: {
                required: "This field is required",
                email: "Please enter correct email"
            },
            password: {
                required: "This field is required",
                minlength: "First name can't be shorter than 2 characters",
                maxLength: "First name can't be longer than 100 characters "
            },
            passwordOld:{
                required: "This field is required",
                minlength: "Password can't be shorter than 8 characters"
            },
            passwordNew: {
                required: "This field is required",
                minlength: "Password can't be shorter than 8 characters"
            },
            passwordNewRepeat: {
                required: "This field is required",
                equalTo: "Password not equal"
            }

        },
        submitHandler: function () {
            func();
            form[0].reset();
        }
    });
};

function ajaxSend(form, funcSuccess,funcError ) {
    let data = form.serialize();
    $.ajax({
        url: '/wp-admin/admin-ajax.php',
        data: data,
        method: 'POST',
        success: function (res) {
            console.log('success ajax');
            funcSuccess(res)
        },
        error: function (error) {
            console.log('error ajax');
            funcError(error)
        },
        complete: function (){

        }
    });
}


let button
function addClassActive(btn, func){
    $(document).on('click', btn , function (){
        button = $(this)
        button.addClass('active')
        button.nextAll().removeClass('active')
        button.prevAll().removeClass('active')
        func()
    })
}



function resetModal(){
}







function toggleModal(btn, modal) {
    btn.click(function () {
        button = $(this)
        modal.show();
        $('body').css('overflow', 'hidden');
        return false;
    });
    $('.modal__close').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        resetModal()
        return false;
    });
    $('.modal__btn-close').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        resetModal()
        return false;
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            resetModal()
            $('body').css('overflow', 'visible');
        }

    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
            resetModal()
            $('body').css('overflow', 'visible');
        }
    });
}




let page = 1;
function loadMore(action, btn){
    $(document).on('click',btn, function (){
        let btn = $(this)
        let wrap = btn.closest('.tab__content-item')
        let category = wrap.attr('data-category')
        let page = wrap.attr('data-page')
        page++

        wrap.attr('data-page', page)
        let obj = { action, page, category}
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function () {
                console.log('success ajax');
                btn.hide()
                btn.closest('tbody').append(res);
                $('.notification__mob').append(res)
            },
            error: function (error) {
                console.log('error ajax');
            },
            complete: function (){

            }
        });
    })

}






function search(){
    let data = $('.project__search').serialize();
    let searchText = $('.project__search-input input').val();
    if (searchText.length < 1){
        $('.project__search-result').hide()
    } else{
        $('.project__search-result').show(300)
    }
    $.ajax({
        url: '/wp-admin/admin-ajax.php',
        data: data,
        method: 'POST',
        success: function (res) {
            console.log('success ajax');
            $('.project__search-list').html(res);
        },
        error: function (error) {
            console.log('error ajax');
        },
        complete: function (){

        }
    });
}




const openMenu = () => {
    $('.header__burger').toggleClass("header__burger-open");
    $('.header__menu').toggleClass('header__menu-show');
    $('body').toggleClass('hidden');
    $(document).on('click','.header__menu-close', function (){
        $('.header__burger').removeClass("header__burger-open");
        $('.header__menu').removeClass('header__menu-show');
        ('body').removeClass('hidden');
    })
};

function openFilter()  {
    $(document).on('click', '.category__mob-button', function (){
        $('.category__select-mob').addClass("active");
        $('body').addClass('hidden');
        $('.category__filter-close-wrap').show()
    })
    $(document).on('click','.category__filter-close-wrap', function (){
        $('.category__select-mob').removeClass("active");
        $('body').removeClass('hidden');
        $(this).hide()
    })
    $(document).on('click','.category__select-header .section__button', function (){
        $('.category__select-mob').removeClass("active");
        $('body').removeClass('hidden');
        $('.category__filter-close-wrap').hide()
    })
};



function filter(){
    if(window.innerWidth <= 666){
        $('.category__select-wrap .category__select').each(function (){
            $(this).attr('disabled','disabled')
        })
    }else{
        $('.category__select-mob input').each(function (){
            $(this).attr('disabled','disabled')
        })
    }
    $(document).on('click', '.category__filter-option span, .category__cat button ', function (){
        ajaxSend($('.category__form'))
    })
    $(document).on('change', '.category__select, .category__form input', function (){
        ajaxSend($('.category__form'))
    })

}



function tab() {
    $(".tab__header-item").click(function () {
        $(".tab__header-item").removeClass("active").eq($(this).index()).addClass("active");
        $(".tab__content-item").hide().eq($(this).index()).fadeIn();
    }).eq(0).addClass("active");
}



function showHint(modal) {
    modal.show();
    setTimeout(function (){
        modal.hide();
    }, 3000)
}


function showHistory(){
    $('.history__show').click(function() {
        $(this).closest('.history__row').toggleClass('active')
        console.log(4444, $(this).closest('.history__row'))
        $(this).closest('.history__row').next('.history__desc').toggleClass('active');
    });
}

$(document).ready(function(){

    let loginForm = $('.login__signin');
    validateForm(loginForm, function () {
        ajaxSend(loginForm)
    });

    let regForm = $('.login__registration');
    validateForm(regForm, function () {
        ajaxSend(regForm)
    });

    let editForm = $('.login__edit');
    $(document).on('submit',editForm, function (e){
        e.preventDefault()
        ajaxSend(editForm, function (){
    })
   })



    let changePassword = $('.login__change-password');
    validateForm(changePassword, function () {
        ajaxSend(changePassword,  function (){
            showHint($('.modal__change'))
        },function (){
            showHint($('.modal__change'))
        })
    });



    let loginForget = $('.login__form-forget');
    validateForm(loginForget, function () {
        ajaxSend(loginForget, '/wp-admin/admin-ajax.php', function (){
            $('.login__form-forget').removeClass('active');
            $('.login__form-success').addClass('active')
        }, function (){
            $('.login__form-forget').removeClass('active');
            $('.login__form-success').addClass('active')
        })
    });

    let passwordReset = $('.login__form-recovery');
    validateForm(passwordReset, function () {
        ajaxSend(passwordReset, '/wp-admin/admin-ajax.php')
    });
    changeMob()
    toggleModal($('.account__invite-button'), $('.modal__invite'));



    openFilter()
    showHistory()
    tab();
    $('.header__burger').on('click', openMenu);
    loadMore('more_project', '.project__wrap .load__more')
    loadMore('more_notification', '.notification__wrap .load__more')
    addClassActive('.category__cat button', function (){
        let category = button.text()
        $('input[name="category"]').val(category)
    })
    addClassActive('.category__view button', function (){
            if(button.hasClass('category__view-list')){
                $('.category__list').addClass('list')
            }else {
                $('.category__list').removeClass('list')
            }
    })
    $('.category__select').select2();
    addActiveFilter()
    loginFormChange()
    filter()
    initProductSlider()
    addToFavorite()


});

$(window).load(function(){

});

$(window).resize(function(){

});
$(window).scroll(function () {
});
