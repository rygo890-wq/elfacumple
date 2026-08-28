/**
 * ✨ Sistema de Partículas Canvas de Alto Rendimiento
 * - Luciérnagas flotantes con pulso de luz
 * - Hojas élficas cayendo suavemente
 * - Estela de polvo mágico en cursor / touch
 */

export class ForestParticleEngine {
    constructor(canvasId = "particles-canvas") {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            this.canvas = document.createElement("canvas");
            this.canvas.id = canvasId;
            this.canvas.className = "ambient-canvas";
            document.body.prepend(this.canvas);
        }
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.fireflies = [];
        this.leaves = [];
        this.stardust = [];
        this.mouseX = -1000;
        this.mouseY = -1000;
        this.isRunning = false;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener("resize", () => this.resize(), { passive: true });

        // Eventos de cursor y touch
        window.addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.addStardust(e.clientX, e.clientY);
        }, { passive: true });

        window.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                this.mouseX = touch.clientX;
                this.mouseY = touch.clientY;
                this.addStardust(touch.clientX, touch.clientY);
            }
        }, { passive: true });

        // Reducir partículas en móviles para óptimo rendimiento
        const isMobile = window.innerWidth < 768;
        const fireflyCount = isMobile ? 30 : 65;
        const leafCount = isMobile ? 12 : 25;

        // Crear luciérnagas
        for (let i = 0; i < fireflyCount; i++) {
            this.fireflies.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 2.2 + 1.2,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                alpha: Math.random(),
                alphaSpeed: Math.random() * 0.02 + 0.01,
                color: Math.random() > 0.3 ? "255, 230, 120" : "130, 255, 180"
            });
        }

        // Crear hojas flotantes
        for (let i = 0; i < leafCount; i++) {
            this.leaves.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: Math.random() * 8 + 6,
                vy: Math.random() * 0.8 + 0.4,
                vx: Math.random() * 0.6 - 0.3,
                angle: Math.random() * Math.PI * 2,
                spinSpeed: (Math.random() - 0.5) * 0.03,
                swing: Math.random() * Math.PI * 2,
                swingSpeed: Math.random() * 0.02 + 0.01,
                color: Math.random() > 0.5 ? "rgba(16, 185, 129, 0.6)" : "rgba(217, 119, 6, 0.6)"
            });
        }

        this.start();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    addStardust(x, y) {
        if (this.stardust.length > 40) return; // Limitar para mantener 60fps
        this.stardust.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            radius: Math.random() * 2.5 + 1,
            alpha: 1,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8 - 0.3,
            color: Math.random() > 0.4 ? "251, 191, 36" : "167, 243, 208"
        });
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.loop();
    }

    loop() {
        if (!this.isRunning) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        // 1. Dibujar luciérnagas
        for (let i = 0; i < this.fireflies.length; i++) {
            const f = this.fireflies[i];
            f.x += f.vx;
            f.y += f.vy;

            // Rebote suave en bordes
            if (f.x < 0) f.x = this.width;
            if (f.x > this.width) f.x = 0;
            if (f.y < 0) f.y = this.height;
            if (f.y > this.height) f.y = 0;

            // Parpadeo suave
            f.alpha += f.alphaSpeed;
            if (f.alpha > 1 || f.alpha < 0.2) {
                f.alphaSpeed = -f.alphaSpeed;
            }

            // Halo de luz
            const glowRadius = f.radius * 4;
            const grad = this.ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowRadius);
            grad.addColorStop(0, `rgba(${f.color}, ${f.alpha * 0.9})`);
            grad.addColorStop(0.5, `rgba(${f.color}, ${f.alpha * 0.3})`);
            grad.addColorStop(1, `rgba(${f.color}, 0)`);

            this.ctx.fillStyle = grad;
            this.ctx.beginPath();
            this.ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // 2. Dibujar hojas cayendo
        for (let i = 0; i < this.leaves.length; i++) {
            const l = this.leaves[i];
            l.swing += l.swingSpeed;
            l.x += Math.sin(l.swing) * 0.8 + l.vx;
            l.y += l.vy;
            l.angle += l.spinSpeed;

            if (l.y > this.height + 20) {
                l.y = -20;
                l.x = Math.random() * this.width;
            }

            this.ctx.save();
            this.ctx.translate(l.x, l.y);
            this.ctx.rotate(l.angle);
            this.ctx.fillStyle = l.color;
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, l.size, l.size * 0.5, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }

        // 3. Dibujar estela de polvo mágico (Stardust)
        for (let i = this.stardust.length - 1; i >= 0; i--) {
            const s = this.stardust[i];
            s.x += s.vx;
            s.y += s.vy;
            s.alpha -= 0.025;

            if (s.alpha <= 0) {
                this.stardust.splice(i, 1);
                continue;
            }

            this.ctx.fillStyle = `rgba(${s.color}, ${s.alpha})`;
            this.ctx.shadowColor = `rgba(${s.color}, 0.8)`;
            this.ctx.shadowBlur = 6;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }

        requestAnimationFrame(() => this.loop());
    }
}
