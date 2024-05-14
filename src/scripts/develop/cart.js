function deleteFromCart() {
    $(document).on('click', '.cart__delete', function () {
        let product = $(this).closest('.cart__item');
        let product_id = product.data('id');

        let obj = { action: 'delete_product', product_id };

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
                $('.cart__total-price span').text(res.data.cart_total)
                product.remove();
            },
            error: function (error) {
                console.log('error ajax');
            },
            complete: function () {}
        });
    });
}

function applyPromo() {
    $(document).on('click', '.cart__promocode >span', function () {
        $(this).hide();
        $('.cart__promocode-block').addClass('active');
    });

    $(document).on('click', '.cart__promocode-block >span', function () {
        $('.cart__promocode-block').removeClass('active');
        $('.cart__promocode > span').show();
    });

    $(document).on('click', '.cart__promocode-block button', function () {

        let promo = $('input[name=promo]').val();

        let obj = { action: 'apply-promo', promo };

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            data: obj,
            method: 'POST',
            success: function (res) {
                console.log('success ajax');
            },
            error: function (error) {
                console.log('error ajax');
                promo.val('');
            },
        });
    });
}



$(document).ready(function () {
    deleteFromCart();
    applyPromo();
});
//# sourceMappingURL=cart.js.map
