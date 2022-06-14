
var sumar;
//AÑADE UN CLICK AL EJECUTAR LA FUNCIÓN
function agregarCounter() {
  sumar += 1;
}
function restarCounter() {
  if (sumar > 0) {
    sumar -= 1;
  }
}

//AÑADE A TODOS LOS BOTONES CON EL NAME count_click QUE AL SER PULSADOS EJECUTEN EL CONTADOR
$( document ).ready(function(){
  $("#sumar").click(function(){
    sumar = parseInt($("#counter-label").val());
    agregarCounter();
    $("#counter-label").val(sumar);
  });
  
  $("#restar").click(function(){
    sumar = parseInt($("#counter-label").val());
    restarCounter();
    $("#counter-label").val(sumar);
  });
});