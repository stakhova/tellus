function loginFormChange(){
    $(document).on('click','.login__forget span', function (){
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




function passwordRecovery(){
    if (window.location.href.includes('set_new_password')) {
        $('.login__form').removeClass('active');
        $('.login__form-recovery').addClass('active');
    }
}


function addFlag(){
    let phoneInputID = "#phone";
    let input = document.querySelector(phoneInputID);
    intlTelInput(input, {
        formatOnDisplay: true,
        geoIpLookup: function(callback) {
            $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                let countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        hiddenInput: "full_number",
        initialCountry: "auto",
        // separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
    });
}
function disabledInput(){
    $('.login .tab__content-item:last-child input').attr('disabled', 'disabled')
    $(document).on('click','.tab__reg',function (){
        $('input[name="type"]').val($(this).data('type'))
        if($('.tab__reg:first-child').hasClass('active')){
            $('.tab__content-item:last-child input').attr('disabled', 'disabled')
            $('.tab__content-item:first-child input').removeAttr('disabled','true' )
        } else{
            $('.tab__content-item:first-child input').attr('disabled', 'disabled')
            $('.tab__content-item:last-child input').removeAttr('disabled','true')
        }
    })
}
$(document).ready(function(){
    loginFormChange()

    addFlag()
    disabledInput();
    passwordRecovery()




})