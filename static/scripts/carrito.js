$(document).ready(function() {
    var cart = []; //carrito con los codigos de los productos
    
    $('.agregar').click(function(event){
        $(this).html('Agregando...');
        var classes = $(this).attr('class').split(' ');
        console.log(classes);
        cart.push(classes.slice(-1)[0]);
        console.log(cart);
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
});