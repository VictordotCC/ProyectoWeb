$(document).ready(function() {
    var cart = [];
    cargarRegiones();
    cargarProductos();
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

    function cargarProductos(){
        $.ajax({
            url: '/productos',
            type: 'GET',
            dataType: 'json',
            success: function(data){
                var productos = data;
                productos.forEach(function(producto){
                    var producto_html = 
                                        `<div class="col ${producto.categoria}">
                                            <div class="card shadow-sm bg-success ">
                                                <img src="static/${producto.imagen}" height="225">
                                        
                                                <div class="card-body">
                                                    <p class="card-text text-white" font-color="#ccc">${producto.nombre}</p>
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div class="btn-group">
                                                            <button type="button" class="btn btn-sm btn-outline-secondary btn-close-white"  data-bs-toggle="modal" data-bs-target="#modalDetalles${producto.id_producto}">Detalles</button>
                                                            <button type="button" class="btn btn-sm btn-outline-secondary btn-close-white agregar servicios">Agregar</button>
                                                        </div>
                                                        <span class="text-muted align-bottom">$${producto.valor_venta.toLocaleString('es-CL')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
                    var modal_html =
                                `<div class="modal fade modal-fullscreen-sm-down " id="modalDetalles${producto.id_producto}" tabindex="-1" role="dialog" aria-labelledby="modalDetallesLabel" aria-hidden="true">
                                    <div class="modal-dialog " role="img">
                                        <div class="modal-content">
                                            <div class="modal-header bg-jardin">
                                                <h5 class="modal-title" id="modalDetalles" style="color: #ffffff;">Detalles</h5>
                                            </div>
                                            <div class="row text-center">
                                                <p style="color: #95939d">${producto.nombre}</p>
                                                <div class="modal-body">
                                                    <div class="lista" >
                                                        <img src="static/${producto.imagen}"  class="rounded-3" alt="${producto.nombre}" width="300px">
                                                        <ul class="list-group list-group-flush col-12">
                                                            <li class="list-group-item" style="color: #95939d">Más Información</li>
                                                            <li class="list-group-item">${producto.descripcion}</li>
                                                            <li class="list-group-item">$${producto.valor_venta.toLocaleString('es-CL')}</li>
                                                        </ul>
                                                        <div class = "d-flex justify-content-between p-2">
                                                            <p class="list-group-item" style="color: #95939d">Categoría: ${producto.categoria}</p>
                                                            <p class="list-group-item" style="color: #95939d">Codigo: ${producto.codigo}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                    $('#contenedor-productos').append(producto_html);
                    $('body').append(modal_html);
                    
                });
            }
        });
    };
});

