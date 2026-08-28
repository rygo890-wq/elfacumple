/**
 * 🧝‍♀️ Personaje Élfico (Lyra) y Diálogos Narrativos
 */

import { burstSparks, typeWriter } from "../utils/dom.js";
import { playChimeSound } from "../utils/animations.js";

export class FairyCharacter {
    constructor(avatarId = "fairy-avatar", dialogueId = "fairy-dialogue", bubbleId = "fairy-bubble") {
        this.avatar = document.getElementById(avatarId);
        this.dialogue = document.getElementById(dialogueId);
        this.bubble = document.getElementById(bubbleId);

        this.init();
    }

    init() {
        if (this.avatar) {
            this.avatar.addEventListener("click", (e) => {
                const rect = this.avatar.getBoundingClientRect();
                burstSparks(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
                playChimeSound(880, 1.2, "triangle");

                this.avatar.classList.add("spin-joy");
                setTimeout(() => this.avatar.classList.remove("spin-joy"), 800);
            });
        }
    }

    speak(text, speed = 25, onComplete = null) {
        if (!this.dialogue) return;
        if (this.bubble) this.bubble.classList.add("visible");

        typeWriter(this.dialogue, text, speed, onComplete);
    }
}
