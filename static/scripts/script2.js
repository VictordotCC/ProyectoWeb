$(document).ready(function() {
    $('#eliminar').click(function() {
        console.log('eliminar');
        $('#productos').children().each(function(index, el) {
            $(el).remove();
        });
    });
});