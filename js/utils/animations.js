/**
 * 🪄 Motor de Efectos Visuales, Sonidos Sintetizados (Web Audio) y Confeti Élfico
 */

// Contexto global de audio para síntesis procedural
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => {});
    }
    return audioCtx;
}

/**
 * Reproduce un tono puro de campanilla cristalina élfica
 */
export function playChimeSound(freq = 587.33, duration = 1.2, type = "sine") {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        // Pequeño vibrato
        osc.frequency.exponentialRampToValueAtTime(freq * 1.01, ctx.currentTime + duration * 0.5);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        console.warn("Audio synthesis note:", e);
    }
}

/**
 * Sonido armónico al tocar una runa
 */
export function playRuneSound(index = 0) {
    const scales = [440, 523.25, 659.25, 783.99, 880]; // Escala pentatónica
    const freq = scales[index % scales.length];
    playChimeSound(freq, 1.4, "triangle");
    setTimeout(() => playChimeSound(freq * 1.5, 1.0, "sine"), 60);
}

/**
 * Sonido celestial al abrir el portal élfico
 */
export function playPortalOpenSound() {
    const notes = [329.63, 392.00, 493.88, 587.33, 659.25, 783.99, 987.77];
    notes.forEach((note, i) => {
        setTimeout(() => playChimeSound(note, 2.0, "sine"), i * 120);
    });
}

/**
 * Sonido de soplar la vela y concesión del deseo
 */
export function playCandleBlowSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;

        // Ruido blanco suave para el soplo
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();

        // Glissando mágico posterior
        setTimeout(() => {
            const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51];
            arpeggio.forEach((freq, idx) => {
                setTimeout(() => playChimeSound(freq, 1.8, "sine"), idx * 90);
            });
        }, 350);
    } catch (e) {}
}

/**
 * Sonido de descubrimiento de secreto
 */
export function playSecretFoundSound() {
    const notes = [587.33, 739.99, 880.00, 1174.66];
    notes.forEach((freq, i) => {
        setTimeout(() => playChimeSound(freq, 1.5, "triangle"), i * 100);
    });
}

/**
 * Confeti élfico majestuoso (Hojas doradas, estrellas titilantes, corazones y chispas)
 */
export function launchElvenConfetti() {
    const symbols = ["✨", "🌿", "⭐", "🍃", "💖", "💎", "🌸", "🌟"];
    const count = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < count; i++) {
        const item = document.createElement("div");
        item.className = "elven-confetti-particle";
        item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        const startY = -30;
        const endY = window.innerHeight + 50;
        const duration = Math.random() * 3 + 2.5;
        const delay = Math.random() * 2;
        const size = Math.random() * 16 + 14;
        const rot = (Math.random() - 0.5) * 720;

        item.style.position = "fixed";
        item.style.left = `${startX}px`;
        item.style.top = `${startY}px`;
        item.style.fontSize = `${size}px`;
        item.style.pointerEvents = "none";
        item.style.zIndex = "9999";
        item.style.filter = "drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))";
        item.style.transition = `transform ${duration}s cubic-bezier(0.25, 1, 0.5, 1), opacity ${duration}s ease-in`;
        item.style.opacity = "1";

        document.body.appendChild(item);

        setTimeout(() => {
            item.style.transform = `translate(${endX - startX}px, ${endY}px) rotate(${rot}deg)`;
            item.style.opacity = "0";
        }, delay * 1000 + 20);

        setTimeout(() => {
            item.remove();
        }, (duration + delay) * 1000 + 500);
    }
}
