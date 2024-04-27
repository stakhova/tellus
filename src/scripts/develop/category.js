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

$(document).ready(function(){
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
    openFilter()
    addActiveFilter()
    filter()

})