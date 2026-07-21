let hambre = 82;
let monedas = 50;

const textoHambre = document.getElementById("porcentaje-hambre"); 
const textoMonedas = document.getElementById("cantidad-monedas");
const botonAlimentar = document.getElementById("boton-alimentar");

function alimentarBetta() {
    if (hambre < 100) {
        hambre = 100; 
        monedas += 10; 
        
        if(textoHambre) textoHambre.innerText = hambre + "%";
        if(textoMonedas) textoMonedas.innerText = monedas;
        
        alert("¡Has alimentado a Blue Moon! +10 Monedas");
    } else {
        alert("¡Blue Moon ya está lleno!");
    }
}

if (botonAlimentar) {
    botonAlimentar.addEventListener("click", alimentarBetta);
}
