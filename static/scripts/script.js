$(document).ready(function() {
    var cart = [];
    cargarRegiones();
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

    function cargarRegiones(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "static/scripts/regiones", true);
        xmlhttp.send();
        xmlhttp.onloadend = function(){
            var listado = xmlhttp.responseText;
            listado = listado.split('\n');
            listado.slice(1).forEach(function(region){
                var lista_regiones = region.split('|');
                $('#InputRegion').append('<option value="'+lista_regiones[0]+'">'+lista_regiones[1]+'</option>');
            });
        };
    }

    $('#InputRegion').change(function(event){
        var comuna = $(this).val();
        cargarComunas(comuna);
    });

    function cargarComunas(region_value) {
        $('#InputComuna').empty();
        if (region_value == '') {
            $('#InputComuna').append('<option value="">Seleccione una comuna</option>');
        };
        region_value = region_value;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "static/scripts/comunas", true);
        xmlhttp.send();
        xmlhttp.onloadend = function() {
            var listado = xmlhttp.responseText;
            listado = listado.split('\n');
            listado.forEach(function(comuna) {
                var lista_comunas = comuna.split('|');
                if (parseInt(lista_comunas[2]) == region_value) {
                    $('#InputComuna').append('<option value="'+lista_comunas[0]+'" name="'+lista_comunas[1]+'">'+lista_comunas[1]+'</option>');
                };
            });
        };
    };

    $('#form-registro').submit(function(eventObj){
        var input_region = $("<input>").attr("type", "hidden").attr("name", "Nombre_region").val($('#InputRegion option:selected').text().slice(0, -1));
        $('#form-registro').append(input_region);
        var input_comuna = $("<input>").attr("type", "hidden").attr("name", "Nombre_comuna").val($('#InputComuna option:selected').text());
        $('#form-registro').append(input_comuna);
        var inputs = $('#form-registro').find('.is-invalid');
        if (inputs.length > 0) {
            return false;
        };
      });

    $('#InputNewPassword2').focusout(function(event){
        var pass = $('#InputNewPassword').val();
        var pass2 = $('#InputNewPassword2').val();
        if (pass != pass2) {
            $('#InputNewPassword2').addClass('is-invalid');
        } else {
            $('#InputNewPassword2').removeClass('is-invalid');
        }
    });
    
    $('#InputNewPassword').focusout(function(event){
        var pass = $('#InputNewPassword').val();
        var pass2 = $('#InputNewPassword2').val();
        if (pass != pass2) {
            $('#InputNewPassword2').addClass('is-invalid');
        } else {
            $('#InputNewPassword2').removeClass('is-invalid');
        }
    });
});

