/**
 * 🌟 Luciérnaga Especial Interactiva (Forest & Path)
 */

import { burstSparks } from "../utils/dom.js";
import { playChimeSound } from "../utils/animations.js";

export class InteractiveFirefly {
    constructor(elementId, onFollow = null) {
        this.element = document.getElementById(elementId);
        this.onFollow = onFollow;
        this.isInteracted = false;

        this.init();
    }

    init() {
        if (!this.element) return;

        this.element.addEventListener("click", (e) => {
            if (this.isInteracted) return;
            this.isInteracted = true;

            const rect = this.element.getBoundingClientRect();
            burstSparks(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
            playChimeSound(784, 1.2, "sine");

            this.element.classList.add("leading-path");

            if (this.onFollow) {
                this.onFollow();
            }
        });
    }
}
