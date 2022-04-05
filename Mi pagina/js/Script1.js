alert("Hola visitante")
window.onload = function()
{
    document.getElementById("boton").addEventListener("click",sumar);

}



function myMove() {
    let id = null;
    const elem = document.getElementById("animate");     
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++; 
        elem.style.top = pos + "px"; 
        elem.style.left = pos + "px"; 
      }
    }
  }



  function myFunction() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("numb").value;
    // If x is Not a Number or less than one or greater than 10
    let text;
    if (isNaN(x) || x < 1 || x > 10) {
        alert("Pon el numero bien")
    } else {
        alert("Que buen numero es el: " + x)
    }
    document.getElementById("demo").innerHTML = text;
  }
  function mySuma(){
    let s = document.getElementById("numbSuma").value;
    if(s == 4){
        document.body.style.backgroundColor = 'green'
        alert ("Ahora te doleran los ojos");
    }
    else{
        alert("No sabes sumar o que?")
    }

  }
  
  document.writeln("- Con esto se imprimen numeros con el ciclo for" + "<br>");
  for (let i = 0; i < 5; i++) {
    document.writeln(i + "<br>");
  }

  document.writeln("- Con esto se imprimen numeros con el ciclo while" + "<br>");
  let i = 0;
  while (i < 10) {
  document.writeln ("<br>El numero es " + i + "<br>" );
  i++;
  }
  document.writeln( "<br>" + "- Con esto se verifica si x(20) es mayor que y(18) con if" + "<br>");
   x = 20;
   y = 18;
    if (x > y) {
      document.writeln("<br>" + "x es mayor que y" + "<br>");
    }  
  document.writeln("- Con esto se imprimen palabraas usando arrays:" + "<br>");
  {
    const Comida = ["Hamburguesa", "Pizza", "Milanesas"];
    document.writeln(Comida + "<br>" + "<br>")
  }

  function captura (){
    var nombre = document.getElementById("nombre1").value;
    var celuest = document.getElementById("celest").value;
    if(nombre == ""){
      alert("El nombre tienes que ponerlo");
      document.getElementById("nombre1").focus();
    }
    else{
      if(celuest == ""){
        alert("El nombre tienes que ponerlo");
        document.getElementById("nombre1").focus();
      }
    else{
      console.log(nombre + "" + celuest);
      document.getElementById("nombre1").value = "";
      document.getElementById("celest").value = "";
    }
  }
}

    