const canvas = document.getElementById("aquariumCanvas");
const ctx = canvas.getContext("2d");

// 1. Almacén de Sprites
const Sprites = {
    images: {},
    load(name, path) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
                this.images[name] = img;
                resolve();
            };
            img.onerror = () => {
                console.warn(`No se pudo cargar el recurso: ${path}`);
                resolve(); // Continuar aunque falte una imagen de prueba
            };
        });
    },
    get(name) {
        return this.images[name];
    }
};

// Configuración inicial del pez (Sección 4: Animaciones)
const Kai = {
    x: 400,
    y: 225,
    rotation: 0,
    tailOffset: 0,
    dorsalOffset: 0,
    analOffset: 0,
    p_leftOffset: 0,
    p_rightOffset: 0,
    time: 0
};

// Función auxiliar para dibujar un Sprite (Sección 3)
function drawSprite(name, x, y, w, h) {
    const img = Sprites.get(name);
    if (img) {
        ctx.drawImage(img, x, y, w, h);
    }
}

// Dibujo de Kai por Capas Estrictas (Sección 3 de tu imagen)
function drawKai() {
    ctx.save();
    ctx.translate(Kai.x, Kai.y);
    ctx.rotate(Kai.rotation);

    // Dibujo secuencial por capas
    drawSprite("kaiTail", -70 + Kai.tailOffset, -22, 40, 44);
    drawSprite("kaiBody", -40, -25, 80, 50);
    drawSprite("kaiDorsal", -18, -35 + Kai.dorsalOffset, 48, 20);
    drawSprite("kaiAnal", -10, 15 + Kai.analOffset, 40, 18);
    drawSprite("kaiPLeft", -20, -5 + Kai.p_leftOffset, 18, 18);
    drawSprite("kaiPRight", -2, -5 + Kai.p_rightOffset, 18, 18);
    drawSprite("kaiEye", 18, -8, 10, 10);

    ctx.restore();
}

// Bucle principal de actualización gráfica
function gameLoop() {
    // Limpiar pantalla y dibujar fondo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bg = Sprites.get("tank_bg");
    if (bg) {
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    }

    // Animación matemática con funciones sinusoidales (Sección 4)
    Kai.time += 0.05;
    Kai.tailOffset = Math.sin(Kai.time * 2) * 5; 
    Kai.dorsalOffset = Math.cos(Kai.time) * 2;
    Kai.analOffset = Math.sin(Kai.time) * 2;

    // Dibujar los personajes
    drawKai();

    requestAnimationFrame(gameLoop);
}

// Carga Inicial de Archivos (Sección 2 de tu imagen)
async function init() {
    await Promise.all([
        Sprites.load("tank_bg", "assets/backgrounds/tank_bg.png"),
        Sprites.load("kaiBody", "assets/sprites/kai/body.png"),
        Sprites.load("kaiTail", "assets/sprites/kai/tail.png"),
        Sprites.load("kaiDorsal", "assets/sprites/kai/dorsal.png"),
        Sprites.load("kaiAnal", "assets/sprites/kai/anal.png"),
        Sprites.load("kaiPLeft", "assets/sprites/kai/pectoral_left.png"),
        Sprites.load("kaiPRight", "assets/sprites/kai/pectoral_right.png"),
        Sprites.load("kaiEye", "assets/sprites/kai/eye.png")
    ]);

    // Arrancar el juego tras cargar las imágenes
    gameLoop();
}

init();
        
