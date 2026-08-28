/**
 * 🧭 Sistema de Navegación, Transiciones Mágicas y Control de Acceso
 */

import { Storage } from "./utils/storage.js";
import { burstSparks } from "./utils/dom.js";
import { playPortalOpenSound, playChimeSound } from "./utils/animations.js";

// ==========================================================================
// 🛠️ MODO DE TESTEO (DEV TEST MODE)
// Cambia a 'false' para quitar el botón de saltar página al terminar las pruebas.
// ==========================================================================
export const DEV_TEST_MODE = false;

export class NavigationManager {
    /**
     * Valida si el usuario tiene permiso para ver la página actual
     * @param {string} requiredStage - Clave de la etapa previa requerida
     * @param {string} fallbackUrl - URL a redirigir si no se cumple
     * @param {string} currentStageToSet - Clave de la etapa actual a marcar como completada
     */
    static checkAccess(requiredStage = null, fallbackUrl = "../index.html", currentStageToSet = null) {
        if (requiredStage && !Storage.getStage(requiredStage)) {
            // Mostrar pantalla de bloqueo mágico
            document.body.innerHTML = `
                <div class="forest-backdrop"></div>
                <div class="access-barrier-screen">
                    <div class="barrier-content-card">
                        <span class="barrier-icon">🔒</span>
                        <h2 class="section-title">El Velo de la Magia</h2>
                        <p class="section-subtitle">
                            "Este sendero todavía está protegido por los espíritus del bosque. Debes completar las etapas previas del viaje para cruzar este umbral."
                        </p>
                        <button id="barrier-return-btn" class="btn-elven">
                            🌿 Volver al Bosque
                        </button>
                    </div>
                </div>
            `;

            document.getElementById("barrier-return-btn")?.addEventListener("click", () => {
                window.location.href = fallbackUrl;
            });

            return false;
        }

        if (currentStageToSet) {
            Storage.setStage(currentStageToSet, "true");
        }

        return true;
    }

    /**
     * Transición cinematográfica fluida hacia otra página
     */
    static goTo(targetUrl, transitionType = "fade", event = null) {
        if (event) {
            burstSparks(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight / 2, 25);
        }

        playChimeSound(600, 1.0, "sine");

        // Crear o usar overlay de transición
        let overlay = document.getElementById("magic-transition-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "magic-transition-overlay";
            overlay.className = `transition-overlay ${transitionType}`;
            document.body.appendChild(overlay);
        }

        requestAnimationFrame(() => {
            overlay.classList.add("active");
        });

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600);
    }

    /**
     * Inyecta una barra flotante de prueba con botones Anterior y Siguiente
     */
    static injectTestButton() {
        if (document.getElementById("dev-test-panel")) return;

        const path = window.location.pathname.toLowerCase();
        let prevPageUrl = "";
        let nextPageUrl = "";

        if (path.endsWith("index.html") || path.endsWith("/")) {
            prevPageUrl = "";
            nextPageUrl = "pages/forest.html";
        } else if (path.includes("forest.html")) {
            prevPageUrl = "../index.html";
            nextPageUrl = "fairy.html";
        } else if (path.includes("fairy.html")) {
            prevPageUrl = "forest.html";
            nextPageUrl = "path.html";
        } else if (path.includes("path.html")) {
            prevPageUrl = "fairy.html";
            nextPageUrl = "portal.html";
        } else if (path.includes("portal.html")) {
            prevPageUrl = "path.html";
            nextPageUrl = "cake.html";
        } else if (path.includes("cake.html")) {
            prevPageUrl = "portal.html";
            nextPageUrl = "letter.html";
        } else if (path.includes("letter.html")) {
            prevPageUrl = "cake.html";
            nextPageUrl = "../index.html";
        }

        const panel = document.createElement("div");
        panel.id = "dev-test-panel";
        panel.style.cssText = `
            position: fixed;
            bottom: 1.2rem;
            right: 1.2rem;
            z-index: 99999;
            display: flex;
            gap: 0.5rem;
            align-items: center;
        `;

        function unlockAllStages() {
            Storage.setStage(Storage.STAGES.FOREST, "true");
            Storage.setStage(Storage.STAGES.FAIRY, "true");
            Storage.setStage(Storage.STAGES.PATH, "true");
            Storage.setStage(Storage.STAGES.PORTAL, "true");
            Storage.setStage(Storage.STAGES.GARDEN, "true");
            Storage.setStage(Storage.STAGES.MEMORIES, "true");
            Storage.setStage(Storage.STAGES.CAKE, "true");
            Storage.setStage(Storage.STAGES.LETTER, "true");
        }

        const btnStyle = `
            background: rgba(15, 23, 42, 0.92);
            color: #fbbf24;
            border: 1.5px solid #fbbf24;
            border-radius: 9999px;
            padding: 0.45rem 0.95rem;
            font-family: sans-serif;
            font-size: 0.8rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.8), 0 0 10px rgba(251,191,36,0.5);
            backdrop-filter: blur(8px);
            transition: transform 0.2s, background 0.2s, color 0.2s;
        `;

        // Botón Anterior (si existe página previa)
        if (prevPageUrl) {
            const prevBtn = document.createElement("button");
            prevBtn.innerHTML = `⏪ Anterior`;
            prevBtn.style.cssText = btnStyle;

            prevBtn.addEventListener("mouseenter", () => {
                prevBtn.style.transform = "scale(1.06)";
                prevBtn.style.background = "#d97706";
                prevBtn.style.color = "#ffffff";
            });
            prevBtn.addEventListener("mouseleave", () => {
                prevBtn.style.transform = "scale(1)";
                prevBtn.style.background = "rgba(15, 23, 42, 0.92)";
                prevBtn.style.color = "#fbbf24";
            });
            prevBtn.addEventListener("click", () => {
                unlockAllStages();
                window.location.href = prevPageUrl;
            });

            panel.appendChild(prevBtn);
        }

        // Botón Siguiente (si existe página siguiente)
        if (nextPageUrl) {
            const nextBtn = document.createElement("button");
            nextBtn.innerHTML = `⏩ Siguiente`;
            nextBtn.style.cssText = btnStyle;

            nextBtn.addEventListener("mouseenter", () => {
                nextBtn.style.transform = "scale(1.06)";
                nextBtn.style.background = "#10b981";
                nextBtn.style.color = "#ffffff";
            });
            nextBtn.addEventListener("mouseleave", () => {
                nextBtn.style.transform = "scale(1)";
                nextBtn.style.background = "rgba(15, 23, 42, 0.92)";
                nextBtn.style.color = "#fbbf24";
            });
            nextBtn.addEventListener("click", () => {
                unlockAllStages();
                window.location.href = nextPageUrl;
            });

            panel.appendChild(nextBtn);
        }

        document.body.appendChild(panel);
    }

    /**
     * Enlaza automáticamente todos los elementos con atributo [data-goto]
     */
    static initLinks() {
        document.querySelectorAll("[data-goto]").forEach(el => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                const target = el.getAttribute("data-goto");
                const transition = el.getAttribute("data-transition") || "fade";
                this.goTo(target, transition, e);
            });
        });

        if (DEV_TEST_MODE) {
            this.injectTestButton();
        }

        // Transición de entrada
        window.addEventListener("DOMContentLoaded", () => {
            document.body.classList.add("page-loaded");
        });
    }
}
