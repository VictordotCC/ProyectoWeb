//PONE EL CONTADOR A 0
var sumar = 0;

//AÑADE UN CLICK AL EJECUTAR LA FUNCIÓN
function agregarCounter() {
  sumar += 1;
}

//MUESTRA CUANTOS CLICK LLEVAMOS
$("#agregarCounter").text(sumar);

//AÑADE A TODOS LOS BOTONES CON EL NAME count_click QUE AL SER PULSADOS EJECUTEN EL CONTADOR
$( document ).ready(function(){
  $("button[name='sumar']").click(function(){
     agregarCounter();
  });
});