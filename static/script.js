$(document).ready(function() {
    var cart = [];
    $('.agregar').click(function(event){
        $(this).html('Agregando...');
        var classes = $(this).attr('class').split(' ');
        cart.push(classes.slice(-1)[0]);
        if (cart.length < 10) {
            $('#cartItems1').html(cart.length);
            $('#cartItems2').html(cart.length);
        } else {
            $('#cartItems1').html('+');
            $('#cartItems2').html('+');
        };
        window.setTimeout(function(){
            $('.agregar').html('Agregar');
        }, 1000);
    });

    $('.nav-link').click(function(event){
            $('.nav-link').removeClass('activo');
            $(this).addClass('activo');   
    });
    $('.navbar-brand').click(function(event){
            $('.nav-link').removeClass('activo');
    });
    $('#filtros').click(function(event){
        $('#menuFiltros').children().each(function(index, el) {
            if ($(el).hasClass('checkbox')) {
                var isChecked= $(el).children().children().is(':checked'); //FIXME
                if (!isChecked) {
                    $('.'+$(el).text()).addClass('d-none');
                } else {
                    $('.'+$(el).text()).removeClass('d-none');
                }
            };
        });
        
    });
});

