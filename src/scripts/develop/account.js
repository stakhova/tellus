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
    sendInvite()
    copyInvite()
})