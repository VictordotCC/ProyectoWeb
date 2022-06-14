$(document).ready(function() {
    $('#eliminar').click(function() {
        $('#productos').children().each(function(index, el) {
            $(el).remove();
        });
    });
});
