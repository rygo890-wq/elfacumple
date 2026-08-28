/**
 * 🎂 Lógica de la Torta Élfica y Ritual de Apagado de Velas Individuales
 */

import { burstSparks, showToast } from "../utils/dom.js";
import { playCandleBlowSound, launchElvenConfetti } from "../utils/animations.js";
import { Storage } from "../utils/storage.js";
import { NavigationManager } from "../navigation.js";

export class CakeRitual {
    constructor() {
        this.candles = document.querySelectorAll(".cake-candle");
        this.candlesLeft = this.candles.length;
        this.ritualBox = document.getElementById("cake-ritual-completion");
        this.instruction = document.getElementById("cake-instruction");
        this.giftButton = document.getElementById("open-gift-btn");

        this.init();
    }

    init() {
        this.candles.forEach((candle, index) => {
            candle.dataset.index = index;
            candle.dataset.extinguished = "false";

            candle.addEventListener("click", (e) => {
                this.extinguishCandle(candle, e);
            });
        });

        if (this.giftButton) {
            this.giftButton.addEventListener("click", (e) => {
                NavigationManager.goTo("letter.html", "portal-flash", e);
            });
        }
    }

    extinguishCandle(candle, event) {
        if (candle.dataset.extinguished === "true") return;

        candle.dataset.extinguished = "true";
        this.candlesLeft--;

        const flame = candle.querySelector(".candle-flame");
        const smoke = candle.querySelector(".candle-smoke");

        if (flame) flame.classList.add("extinguished");
        if (smoke) smoke.classList.add("rising");

        if (event) {
            burstSparks(event.clientX, event.clientY, 15, ["#fef08a", "#fbbf24", "#ffffff"]);
        }

        playCandleBlowSound();

        // Oscurecer progresivamente la escena según las velas restantes
        const darknessFactor = (5 - this.candlesLeft) * 0.15;
        document.body.style.filter = `brightness(${1 - darknessFactor})`;

        if (this.candlesLeft > 0) {
            showToast(`🕯️ Vela apagada. Quedan ${this.candlesLeft} por apagar...`, "✨", 2000);
        } else {
            this.completeRitual();
        }
    }

    completeRitual() {
        // Desbloquear etapa en Storage
        Storage.setStage(Storage.STAGES.CAKE, "true");
        Storage.setStage(Storage.STAGES.LETTER, "true");

        document.body.classList.add("ritual-complete-darkness");
        document.body.style.filter = "";

        setTimeout(() => {
            if (this.instruction) {
                this.instruction.style.display = "none";
            }

            if (this.ritualBox) {
                this.ritualBox.classList.add("visible");
            }

            launchElvenConfetti();
            showToast("✨ ¡El ritual ha sido completado! Tu regalo te espera.", "🌟", 6000);
        }, 1500);
    }
}
