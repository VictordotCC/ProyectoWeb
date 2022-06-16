$(document).ready(function() {
    /*$('#eliminar').click(function() {
        $('#productos').children().each(function(index, el) {
            $(el).remove();
        });
    });*/
    cart2 = cart.replaceAll("'",'"');
    prods = JSON.parse(cart2);
    console.log(prods);
});