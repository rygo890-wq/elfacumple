/**
 * 🌿 Utilidades de Manipulación del DOM y Efectos Visuales
 */

export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

/**
 * Agrega un escuchador de eventos de manera segura
 */
export function on(element, event, handler, options = {}) {
    if (!element) return;
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
}

/**
 * Notificaciones deshabilitadas
 */
export function showToast(message, icon = "✨", duration = 4000) {
    // Deshabilitado por preferencia de usuario
    return;
}

/**
 * Genera una explosión de chispas mágicas en coordenadas específicas (x, y)
 */
export function burstSparks(x, y, count = 15, colors = ["#ffd700", "#10b981", "#6ee7b7", "#ffffff", "#c084fc"]) {
    for (let i = 0; i < count; i++) {
        const spark = document.createElement("div");
        spark.className = "magic-sparkle-dot";
        
        const size = Math.random() * 6 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const distance = Math.random() * 60 + 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.backgroundColor = color;
        spark.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.setProperty("--tx", `${tx}px`);
        spark.style.setProperty("--ty", `${ty}px`);
        
        document.body.appendChild(spark);
        
        setTimeout(() => spark.remove(), 900);
    }
}

/**
 * Efecto de escritura progresiva (Typewriter) para pergaminos
 */
export function typeWriter(element, text, speed = 25, onComplete = null) {
    if (!element) return;
    element.textContent = "";
    let index = 0;
    
    function step() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(step, speed);
        } else if (onComplete) {
            onComplete();
        }
    }
    step();
}
