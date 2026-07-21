// 1. VARIABLES - Guardamos el estado inicial de tu Betta
let hambre = 82; // El porcentaje actual que se ve en tu barra
let monedas = 50;

// 2. CONEXIÓN - Conectamos el código con tus textos y botones de la pantalla
// (Asegúrate de que en tu HTML estos elementos tengan estos mismos "id")
const textoHambre = document.getElementById("porcentaje-hambre"); 
const textoMonedas = document.getElementById("cantidad-monedas");
const botonAlimentar = document.getElementById("boton-alimentar");

// 3. ACCIÓN - Lo que pasa cuando el usuario presiona "Alimentar"
function alimentarBetta() {
    if (hambre < 100) {
        hambre = 100; // Subimos el hambre al máximo
        monedas += 10; // Regalamos 10 monedas por cuidarlo (o puedes restarlas si cuesta)
        
        // Actualizamos visualmente la pantalla
        if(textoHambre) textoHambre.innerText = hambre + "%";
        if(textoMonedas) textoMonedas.innerText = monedas;
        
        alert("¡Has alimentado a Blue Moon! +10 Monedas");
    } else {
        alert("¡Blue Moon ya está lleno!");
    }
}

// 4. ESCUCHADOR - Le decimos al botón que se quede esperando el clic del usuario
if (botonAlimentar) {
    botonAlimentar.addEventListener("click", alimentarBetta);
}
console.log("BettaKeeper Alpha 0.1");

setTimeout(()=>{

document.querySelector("p").textContent="Ready!";

},3000);
