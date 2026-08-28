/**
 * 🌿 ORQUESTADOR PRINCIPAL — CARTA DE CUMPLEAÑOS ÉLFICA
 */

import { CONFIG } from "./config.js";
import { ForestParticleEngine } from "./components/particles.js";
import { MusicManager } from "./components/music.js";
import { ElfGuide } from "./components/elfGuide.js";
import { SceneManager } from "./components/sceneManager.js";
import { IntroScene } from "./components/intro.js";
import { ForestGateScene } from "./components/forest.js";
import { CakeScene } from "./components/cake.js";
import { FinalScene } from "./components/finalScene.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("🌲 Iniciando aventura mágica: Bosque de Aethelgard...");

    // 1. Inicializar sistema de partículas y luciérnagas
    const particles = new ForestParticleEngine("particles-canvas");

    // 2. Inicializar gestor de música y audio
    const music = new MusicManager(CONFIG);

    // 3. Inicializar elfa guía
    const elf = new ElfGuide(CONFIG);

    // 4. Inicializar Gestor de Escenas (Scene Manager)
    const sceneManager = new SceneManager(CONFIG, elf);

    // 5. Inicializar escena de introducción
    const intro = new IntroScene(CONFIG, () => {
        // Al entrar al bosque
        elf.show();
        sceneManager.goToScene(1);
        music.play().catch(() => {});
    });

    // 6. Inicializar puerta élfica y runas
    const gate = new ForestGateScene(CONFIG, () => {
        sceneManager.goToScene(2);
    });

    // 7. Inicializar galería de recuerdos
    const gallery = new GalleryScene(CONFIG);

    // 9. Inicializar torta mágica
    const cake = new CakeScene(CONFIG);

    // 10. Inicializar carta de cumpleaños
    const letter = new LetterScene(CONFIG);

    // 11. Inicializar escena final
    const finalScene = new FinalScene(CONFIG);

    // 12. Seguidor de iluminación mágica para el cursor
    setupMagicLighting();
});

/**
 * Crea una sutil iluminación que sigue la posición del mouse o touch
 */
function setupMagicLighting() {
    const light = document.getElementById("cursor-magic-light");
    if (!light) return;

    window.addEventListener("mousemove", (e) => {
        light.style.left = `${e.clientX}px`;
        light.style.top = `${e.clientY}px`;
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            light.style.left = `${e.touches[0].clientX}px`;
            light.style.top = `${e.touches[0].clientY}px`;
        }
    }, { passive: true });
}
