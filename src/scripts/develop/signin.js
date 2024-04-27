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


$(document).ready(function(){
    loginFormChange()
})