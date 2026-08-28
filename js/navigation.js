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
export const DEV_TEST_MODE = true;

export class NavigationManager {
    /**
     * Valida si el usuario tiene permiso para ver la página actual
     * @param {string} requiredStage - Clave de la etapa previa requerida
     * @param {string} fallbackUrl - URL a redirigir si no se cumple
     * @param {string} currentStageToSet - Clave de la etapa actual a marcar como completada
     */
    static checkAccess(requiredStage = null, fallbackUrl = "../index.html", currentStageToSet = null) {
        // En modo de testeo, permitir siempre acceso y auto-desbloquear
        if (DEV_TEST_MODE) {
            if (currentStageToSet) {
                Storage.setStage(currentStageToSet, "true");
            }
            return true;
        }

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
     * Inyecta una barra flotante de pruebas con botones Anterior, Siguiente y selector de página
     */
    static injectTestButton() {
        if (!DEV_TEST_MODE) return;
        if (document.getElementById("dev-test-panel")) return;
        if (!document.body) {
            window.addEventListener("DOMContentLoaded", () => this.injectTestButton());
            return;
        }

        const href = (window.location.href || "").toLowerCase();
        const pathname = (window.location.pathname || "").toLowerCase();
        const isInsidePages = pathname.includes("/pages/") || pathname.includes("\\pages\\") || href.includes("/pages/");

        const stagesList = [
            { id: "intro", name: "1. 🌟 Inicio (Portada)", url: isInsidePages ? "../index.html" : "index.html" },
            { id: "forest", name: "2. 🌲 El Bosque", url: isInsidePages ? "forest.html" : "pages/forest.html" },
            { id: "fairy", name: "3. 🧚‍♀️ Hada Guía", url: isInsidePages ? "fairy.html" : "pages/fairy.html" },
            { id: "path", name: "4. 🛤️ El Sendero", url: isInsidePages ? "path.html" : "pages/path.html" },
            { id: "portal", name: "5. 🔮 Portal Mágico", url: isInsidePages ? "portal.html" : "pages/portal.html" },
            { id: "cake", name: "6. 🎂 Pastel & Deseos", url: isInsidePages ? "cake.html" : "pages/cake.html" },
            { id: "letter", name: "7. 💌 Carta Final", url: isInsidePages ? "letter.html" : "pages/letter.html" }
        ];

        let currentIndex = 0;
        if (pathname.includes("forest") || href.includes("forest")) currentIndex = 1;
        else if (pathname.includes("fairy") || href.includes("fairy")) currentIndex = 2;
        else if (pathname.includes("path") || href.includes("path")) currentIndex = 3;
        else if (pathname.includes("portal") || href.includes("portal")) currentIndex = 4;
        else if (pathname.includes("cake") || href.includes("cake")) currentIndex = 5;
        else if (pathname.includes("letter") || href.includes("letter")) currentIndex = 6;
        else currentIndex = 0;

        const prevPageUrl = currentIndex > 0 ? stagesList[currentIndex - 1].url : "";
        const nextPageUrl = currentIndex < stagesList.length - 1 ? stagesList[currentIndex + 1].url : "";

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

        const panel = document.createElement("div");
        panel.id = "dev-test-panel";
        panel.style.cssText = `
            position: fixed;
            bottom: 1.2rem;
            right: 1.2rem;
            z-index: 9999999;
            display: flex;
            align-items: center;
            gap: 0.45rem;
            background: rgba(10, 15, 30, 0.95);
            padding: 0.45rem 0.75rem;
            border-radius: 9999px;
            border: 1.5px solid rgba(251, 191, 36, 0.7);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.75), 0 0 15px rgba(251, 191, 36, 0.35);
            backdrop-filter: blur(12px);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 0.8rem;
            user-select: none;
        `;

        const btnBaseStyle = `
            background: rgba(30, 41, 59, 0.85);
            color: #fef08a;
            border: 1px solid rgba(251, 191, 36, 0.4);
            border-radius: 9999px;
            padding: 0.35rem 0.75rem;
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            transition: all 0.2s ease;
            white-space: nowrap;
        `;

        // Badge indicador
        const badge = document.createElement("span");
        badge.innerHTML = `🛠️ <b>TEST</b>`;
        badge.style.cssText = `
            color: #fbbf24;
            font-size: 0.72rem;
            letter-spacing: 0.05em;
            padding-right: 0.2rem;
        `;
        panel.appendChild(badge);

        // Botón Anterior
        if (prevPageUrl) {
            const prevBtn = document.createElement("button");
            prevBtn.innerHTML = `⏪ Anterior`;
            prevBtn.style.cssText = btnBaseStyle;
            prevBtn.onmouseenter = () => { prevBtn.style.background = "#d97706"; prevBtn.style.color = "#fff"; };
            prevBtn.onmouseleave = () => { prevBtn.style.background = "rgba(30, 41, 59, 0.85)"; prevBtn.style.color = "#fef08a"; };
            prevBtn.onclick = () => {
                unlockAllStages();
                window.location.href = prevPageUrl;
            };
            panel.appendChild(prevBtn);
        }

        // Selector desplegable de páginas
        const select = document.createElement("select");
        select.style.cssText = `
            background: rgba(15, 23, 42, 0.95);
            color: #67e8f9;
            border: 1px solid rgba(103, 232, 249, 0.5);
            border-radius: 9999px;
            padding: 0.32rem 0.65rem;
            font-size: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            outline: none;
        `;
        stagesList.forEach((stg, idx) => {
            const opt = document.createElement("option");
            opt.value = stg.url;
            opt.textContent = stg.name;
            if (idx === currentIndex) opt.selected = true;
            select.appendChild(opt);
        });
        select.onchange = () => {
            unlockAllStages();
            window.location.href = select.value;
        };
        panel.appendChild(select);

        // Botón Siguiente
        if (nextPageUrl) {
            const nextBtn = document.createElement("button");
            nextBtn.innerHTML = `⏩ Siguiente`;
            nextBtn.style.cssText = btnBaseStyle + `background: rgba(16, 185, 129, 0.25); border-color: #10b981; color: #a7f3d0;`;
            nextBtn.onmouseenter = () => { nextBtn.style.background = "#10b981"; nextBtn.style.color = "#fff"; };
            nextBtn.onmouseleave = () => { nextBtn.style.background = "rgba(16, 185, 129, 0.25)"; nextBtn.style.color = "#a7f3d0"; };
            nextBtn.onclick = () => {
                unlockAllStages();
                window.location.href = nextPageUrl;
            };
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
        if (document.readyState === "loading") {
            window.addEventListener("DOMContentLoaded", () => {
                document.body.classList.add("page-loaded");
            });
        } else {
            document.body.classList.add("page-loaded");
        }
    }
}

// Auto-inyección garantizada en modo de pruebas en cuanto cargue el script
if (DEV_TEST_MODE) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            NavigationManager.injectTestButton();
        });
    } else {
        NavigationManager.injectTestButton();
    }
}
