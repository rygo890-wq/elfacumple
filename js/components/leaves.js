/**
 * 🍃 Hojas Élficas Mecidas por el Viento
 */

export class FallingLeaves {
    constructor(container = document.body, count = 15) {
        this.container = container;
        this.count = count;
        this.init();
    }

    init() {
        const symbols = ["🍃", "🌿", "🍁", "🍂"];
        for (let i = 0; i < this.count; i++) {
            const leaf = document.createElement("div");
            leaf.className = "floating-ambient-leaf";
            leaf.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            const startX = Math.random() * 100;
            const delay = Math.random() * 8;
            const duration = Math.random() * 6 + 7;
            const size = Math.random() * 12 + 14;

            leaf.style.left = `${startX}vw`;
            leaf.style.top = `-30px`;
            leaf.style.fontSize = `${size}px`;
            leaf.style.animationDelay = `${delay}s`;
            leaf.style.animationDuration = `${duration}s`;

            this.container.appendChild(leaf);
        }
    }
}
