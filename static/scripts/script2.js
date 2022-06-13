$(document).ready(function() {
    $('#eliminar').click(function() {
        console.log('eliminar');
        $('#Orquidias').children().each(function(index, el) {
            $(el).remove();
        });
    });
});
