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
function addToFavorite(){
    $(document).on('click', '.like', function (){
        let product_id
        if($('.product').length > 0){
            product_id = $(this).closest('.product').data('id')
        } else{
            product_id = $(this).closest('.card__item').data('id')
        }
        $('.card__item').each(function (){
            console.log('ididid',$(this).data('id'), product_id)
            if($(this).data('id') == product_id){
                $(this).find('.like').toggleClass('active')
            }
        })
        let to_favorite = $(this).hasClass('active') ? 'add': 'remove'
        let item
        if($('.watchlist').length > 0){
            item = $(this).closest('.card__item')
        }
        if(window.innerWidth > 666  && $('.product').length > 0){
            if($(this).hasClass('product__favorite-remove')  ){
                $(this).text('Add to watchlist')
                $(this).removeClass('product__favorite-remove')
            } else{
                $(this).addClass('product__favorite-remove')
                $(this).text('Remove from watchlist')
            }
        }





        let obj = {action:'add_to_favorite', product_id, to_favorite}


        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
                // funcSuccess(res)
                item.remove()
            },
            error: function (error) {
                console.log('error ajax');
                // funcError(error)
                item.remove()
                if($('.watchlist .card__item').length < 1){
                    $('.card__item-more').remove()
                    $('.watchlist__empty').css('display','flex')
                }
            }
        });
    })
}

function changeMob() {
    if(window.innerWidth <= 666){
        $('.category__mob').append($('.category__select[name="sort_by"]'))
        $('.invite__info-phone').each(function (){
            $(this).closest('.invite__info-item').find('.invite__info-title').append($(this))
        })


    }
}


function openModal(modal, func) {
    modal.show();
    $('body').css('overflow', 'hidden');

    $('.modal__close').click(function () {
        $(this).closest(modal).hide();
        $('body').css('overflow', 'visible');
        func();
        return false;
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            modal.hide();
            $('body').css('overflow', 'visible');
            func();
        }
    });
    modal.click(function (e) {
        if ($(e.target).closest('.modal__content').length == 0) {
            $(this).hide();
            $('body').css('overflow', 'visible');
            func();
        }
    });

}


function addToCart(){

    $('.card__buy-icon').each(function (){
        let variation = $(this).closest('.card__item').find('.card__variants-select')

        if(variation.length > 0 && variation.val() ==''){
            $(this).addClass('variable')
            $(this).next().addClass('variable')
        }
    })

    $(document).on('change','.card__variants-select', function (){
        if($(this).val() !== ""){
            $(this).closest('.card__item').find('.card__buy-icon').removeClass('variable')
            $(this).closest('.card__item').find('.card__buy-button').removeClass('variable')
            $(this).closest('.card__item').find('.card__hint').remove()
        }

    })



    $(document).on('click','.card__buy-icon', function (){
        if($(this).hasClass('variable')){
            $(this).closest('.card__item').find('.card__variants').prepend('<p class="card__hint">Please, select option</p>')
        } else{
            let product_id = $(this).closest('.card__item').data('id')
            let variation = $(this).closest('.card__item').find('.card__variants-select').val()
            let obj = {action:'add_to_cart', product_id, variation}
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                data: obj,
                method: 'POST',
                success: function (res) {
                    console.log('success ajax');
                    $('.modal__cart .modal__overflow').html(res)
                    openModal($('.modal__cart'))
                },
                error: function (error) {
                    console.log('error ajax');
                    openModal($('.modal__cart'))
                },
            });
        }


    })
    $(document).on('click','.card__buy-button', function (e){
        e.preventDefault()
        if($(this).hasClass('variable')){
            $(this).closest('.card__item').find('.card__variants').prepend('<p class="card__hint">Please, select option</p>')
        } else{
            let url = $(this).attr('href')
            let variation = $(this).closest('.card__item').find('.card__variants-select').val()
            let newUrl =  `${url}&variation_id=${variation}`
            window.location.href = newUrl;
        }

    })
}


function validateForm (form, func, noreset) {
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
            name: {
                required: true,
                goodMessage: true,
            },
            lastname: {
                required: true,
                goodMessage: true,
            },
            company_name: {
                required: true,
                goodMessage: true,
            },
            email: {
                required: true,
                goodEmail: true,
                email: true
            },
            phone: {
                required: true,
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
            },
            passwordReg: {
                required: true,
                minlength: 8
            },
            passwordRegRepeat: {
                required: true,
                minlength: 8,
                equalTo: "#passwordReg"
            },
            country: {
                required: true
            },
            city: {
                required: true
            },
            zip: {
                required: true
            },
            street: {
                required: true
            },
            vat: {
                required: true
            },
            accept: {
                required: true,
            }

        },
        messages: {
            name: {
                required: "This field is required",
                email: "Please enter correct name"
            },
            lastname: {
                required: "This field is required",
                email: "Please enter correct last name"
            },
            company_name: {
                required: "This field is required",
                email: "Please enter correct company name"
            },
            email: {
                required: "This field is required",
                email: "Please enter correct email"
            },
            phone: {
                required: "This field is required",
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
            },
            passwordReg: {
                required: "This field is required",
                minlength: "Password can't be shorter than 8 characters"
            },
            passwordRegRepeat: {
                required: "This field is required",
                equalTo: "Password not equal"
            },
            country: {
                required: "This field is required",
            },
            city: {
                required: "This field is required",
            },
            zip: {
                required: "This field is required",
            },
            street: {
                required: "This field is required",
            },
            vat: {
                required: "This field is required",
            },
            accept: {
                required: "This field is required",
            }

        },
        submitHandler: function () {
            func();
            noreset ? null : form[0].reset()
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
            $('.category__list').append(res)
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
    $(document).on('click', btn, function (){
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
function loadMore(){
    $(document).on('click','.more', function (){

        let button = $(this)
        let data
        let post__in = $(this).closest('.category__list').data('post__in')
        page++

        if($(".category__form").length > 0 ) {
            $('input[name="page"]').val(page)
            data = $(".category__form").serialize();
        } else{
            data = {action:"show_product_watchlist", page, post__in }
        }
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: data,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
                button.hide()
                $('.category__list').append(res)

            },
            error: function (error) {
                console.log('error ajax');
            },
        });
    })
}



function search(){
    $(document).on('click','.header__search .header__icon ', function (){
        let wrap = $(this).closest('.header__search')
        wrap.toggleClass('active')
    })
    $(document).on('input','.header__search-form input ', function (){
        if ($(this).val().trim() !== '') {
            $('.header__search-form button').addClass('active');
        } else {
            $('.header__search-form button').removeClass('active');
        }
    })
    if(window.innerWidth < 666){
        $('.header__search-form button').text('')
    }

    $(document).on('submit', '.header__search-form', function (e){
            e.preventDefault();
            let data = $(this).serialize()
            console.log(44444, data)
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                data: data,
                method: 'POST',
                success: function (res) {
                    console.log('success ajax');
                },
                error: function (error) {
                    console.log('error ajax');
                },

            });
        })




}






function counter(){
    $(document).on('click','.product__counter-minus', function (){
        let input = $(this).closest('.product__counter').find('input')
        if (input.val() > 1 ) {
            input.val(parseInt(input.val()) - 1)
        }
    })
    $(document).on('click','.product__counter-plus', function (){
        let input = $(this).closest('.product__counter').find('input')
        input.val(parseInt(input.val()) + 1)

    })
}





function tab() {
    $(".tab__header-item").click(function () {
        $(".tab__header-item").removeClass("active").eq($(this).index()).addClass("active");
        $(".tab__content-item").hide().eq($(this).index()).fadeIn();
    }).eq(0).addClass("active");
}


function showPassword() {
    $('.login__input-eye').click(function (e) {
        $(this).toggleClass('active');
        $(this).hasClass('active') ? $(this).closest('.login__input').find('input').attr('type', 'text') : $(this).closest('.login__input').find('input').attr('type', 'password');
    });
}


function showHint(modal) {
    modal.show();
    setTimeout(function (){
        modal.hide();
    }, 3000)
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

function initCountryCity(){
    $('.countrySelect').each(function() {
        var $select = $(this);
        $.ajax({
            url: "https://restcountries.com/v3.1/all",
            type: "GET",
            success: function(data) {
                // Iterate through each country and add it to the select dropdown
                data.forEach(function(country) {
                    $select.append('<option value="' + country.name.common + '">' + country.name.common + '</option>');
                });

                // $select.trigger('change');
            }
        });
    });
    $('.tab__content-item:last-child .countrySelect').on('change', function() {
        let selectedValues = $(this).val();
        let obj = { action:'select_country', country:selectedValues };
        console.log("Selected values: ", selectedValues);

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
            },
            error: function (error) {
                console.log('error ajax');
                $('#vat').attr('name','vat_not_req')
            },
        });
    });
    $(".countrySelect").select2();
    // $('.login__edit .countrySelect').
};
function changeCount() {

    function changeCountFunc() {
        let product = $(this).closest('.cart__item');
        let count = product.find('.cart__counter input').val();
        let product_id = product.data('id');
        let obj = { action: 'change_product-count', product_id, count };
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
                product.find('.cart__price-full span').text(res.data.item_total)
                $('.cart__total-price span').text(res.data.cart_total)
            },
            error: function (error) {
                console.log('error ajax');
            },
        });
    }
    $(document).on('change', '.cart__counter input', changeCountFunc);
    $(document).on('click', '.cart__counter button', changeCountFunc);
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

    let editForm = '.login__edit';
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
        ajaxSend(loginForget,function (){
            $('.login__form-forget').removeClass('active');
            $('.login__form-success').addClass('active')
        }, function (){
            $('.login__form-forget').removeClass('active');
            $('.login__form-success').addClass('active')
        })
    });
    let editUser = $('.login__edit');
    validateForm(editUser, function () {
        ajaxSend(editUser, function (){

        }, function (){

        })
    },1);
    let editUserCompany = $('.login__edit-company');
    validateForm(editUserCompany, function () {
        ajaxSend(editUserCompany,  function (){

        }, function (){

        })
    },1);







    let passwordReset = $('.login__form-recovery');
    validateForm(passwordReset, function () {
        ajaxSend(passwordReset)
    });



    changeMob()
    toggleModal($('.account__invite-button'), $('.modal__invite'));

    $('.header__burger').on('click', openMenu);
    loadMore()
    counter()
    tab();
    addToFavorite()
    showPassword()
    search()
    addToCart()
    initCountryCity()
    changeCount()


    $('.card__variants-select').each(function() {
        $(this).select2({
            dropdownParent: $(this).closest('section')
        });
    });

});


$(window).load(function(){

});

$(window).resize(function(){

});
$(window).scroll(function () {
});
