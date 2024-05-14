function editAddress(){
    $(document).on('click','.address__edit',function (){
        $(this).closest('.address').hide()
        let address = $(this).closest('.address__item');
        let address_id = address.attr('data-address-id');

        $('input[name="address_id"]').val(address_id)
        let str = address.find('h3').text()
        let arr = str.split(',')

        console.log('arr',arr)

        let country = arr.splice(1, 1)[0];
        console.log('arr',arr)
        console.log('country',country)

        $('.address__form select option:first-child').text(country)
        $('.address__form .login__input input').each(function (index){
            $(this).val(arr[index]);
        })

        $('.address__form-wrap').show()
    })
    $(document).on('click','.address__delete', function (){
        let address = $(this).closest('.address__item');
        let address_id = address.attr('data-address-id');

        let obj = { action: 'delete_address', address_id };

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
                address.remove();
            },
            error: function (error) {
                console.log('error ajax');
                address.remove();
            },
        });
    })
    $(document).on('click','.address__add',function (){
        $(this).closest('.address').hide();
        $('.address__form-wrap').show()
    })

    $(document).on('click','.address__form-back',function (){
        $(this).closest('.address__form-wrap').hide();
        $('.address').css('display','flex');
        $('input[name="address_id"]').val('')
        $('.address__form input').val('')
    })

}

function showHistory(){
    $('.history__show').click(function() {
        $(this).closest('.history__row').toggleClass('active')
        $(this).closest('.history__row').next('.history__desc').toggleClass('active');
    });
}

function copyInvite(){
    $("#invite__button").click(function() {
        let text = $("#invite").text();
        let $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(text).select();
        document.execCommand("copy");
        $temp.remove();
        $(this).closest('.modal').hide()
        showHint($('.modal__invite-copy'))
    })
}


function searchInvite() {
    let data = $('.invite__table-form').serialize();
    $.ajax({
        url: '/wp-admin/admin-ajax.php',
        data: data,
        method: 'POST',
        success: function (res) {
            console.log('success ajax');
            $('.invite__info-list').html(res);
        },
        error: function (error) {
            console.log('error ajax');
            // $('.invite__info-list').html(res);
        },
    });
}

function showSearch() {
    $(document).on('keydown', '.invite__table-form input', function () {
        clearTimeout($(this).data('timer'));
        let timer = setTimeout(function () {
            searchInvite();
        }, 500);
        $(this).data('timer', timer);
    });

    // $(document).on('submit', '.project__search', function (e) {
    //     e.preventDefault();
    //     search();
    // });
    // $(document).on('input', '.project__search-input input', function () {
    //     if ($(this).is(":focus")) {
    //         $('.project__search').addClass('focused');
    //     } else {
    //         $('.project__search').removeClass('focused');
    //     }
    // });
}

function sortInvite(){
    $(document).on('click','.invite__info-head img',function (){
        let items = $('.invite__info-item');
        let itemArray = [];

        items.each(function() {
            let name = $(this).find('.invite__info-title h3').text();
            itemArray.push({ name: name, element: $(this) });
            console.log('333',itemArray)
        });

        itemArray.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        let container = $('.invite__info-list');
        container.empty();

        $.each(itemArray, function() {
            container.append(this.element);
        });
    })

}

function removeInvite(){
    $(document).on('click','.invite__info-remove', function (){
        let item = $(this).closest('.invite__info-item')
        let id = item.data('id');

        let obj = { action: 'remove_invite', id };
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
                item.remove()
                if($('.invite__info-item').length < 1 ){
                    $('.invite__info').remove()
                    $('.invite__table-form').remove()
                }
            },
            error: function (error) {
                console.log('error ajax');

            },
        });
    })
}

function sendInvite(){

    const emailRegex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,62}$/;

    $(document).on('input', '#inviteEmail', function (){
        const fieldVal = $(this).val();
        if(emailRegex.test(fieldVal)){
           $(this).closest('.login__input').find('button').removeClass('disabled')
        } else {
            $(this).closest('.login__input').find('button').addClass('disabled')
        }
    })

    $(document).on('click', '.form__invite button', function (e){
        let form = $('.form__invite')
        let modal = form.closest('.modal')
        let data = form.serialize();
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: data,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
                modal.hide();
                form[0].reset()
            },
            error: function (error) {
                console.log('error ajax');
                modal.hide()
                form[0].reset()
            },
            complete: function (){

            }
        });
    })
}

$(document).ready(function(){
    showHistory();
    showSearch()
    sendInvite()
    copyInvite()
    removeInvite();
    sortInvite()
    editAddress()

    let addressForm = $('.address__form');
    validateForm(addressForm, function () {
        ajaxSend(addressForm, function (res){
            $('.address__form-wrap').hide()
            $('.address').css('display','flex')
            $('input[name="address_id"]').val('')
            $('.address').append(res)
        },function (){
            $('.address__form-wrap').hide()
            $('.address').css('display','flex')
            $('input[name="address_id"]').val('')

        } )
    });

})