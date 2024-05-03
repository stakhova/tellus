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

function openPrice(){
    $(document).on('click','.category__price-button',function (){
            $('.category__price-toggle').toggleClass('active')
    })
    $(document).on('click', function(event) {
        let target = $(event.target);
        if (!target.hasClass('category__price-button') && !target.hasClass('category__price-toggle') ) {
            $('.category__price-toggle').removeClass('active');
        }
    });
    $(document).on('click', '.category__price-toggle *', function(event) {
        event.stopPropagation();
    });
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
        page = 1;
        $('input[name="page"]').val(page)

        ajaxSend($('.category__form'), function (res){
            $('.category__list > *').remove()
            $('.category__list').append(res)
        })
    })
    $(document).on('change', '.category__select, .category__form input', function (){
        page = 1;
        $('input[name="page"]').val(page)
        ajaxSend($('.category__form'), function (res){
            $('.category__list > *').remove()
            $('.category__list').append(res)
        })
    })
}
function initSelect2(){
    $('.category__select').select2()
    $('.category__select').each(function (){
        console.log($(this));
        let placeholderWidth = $(this).next('.select2').find('.select2-selection__placeholder').outerWidth();
        console.log('placeholderWidth',placeholderWidth)
        $(this).next('.select2').css('width', placeholderWidth + 51 + 'px');
    })
}

$(document).ready(function(){
    addClassActive('.category__cat button', function (){
        let category = button.text()
        $('input[name="category"]').val(category)
    })
    addClassActive('.category__view button', function (){
        if (button.hasClass('category__view-list')){
            $('.category__list').addClass('list')
        } else {
            $('.category__list').removeClass('list')
        }
    })
    initSelect2()
    openFilter()
    addActiveFilter()
    filter();
    openPrice()
})