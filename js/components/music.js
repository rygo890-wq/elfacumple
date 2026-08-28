/**
 * 🎵 Gestor de Música y Audio con Persistencia entre Páginas
 */

import { Storage } from "../utils/storage.js";
import { showToast } from "../utils/dom.js";

export class MusicManager {
    constructor(config) {
        this.config = config.musica;
        this.audioElement = new Audio();
        this.audioElement.loop = true;
        this.audioElement.volume = this.config.volumenInicial || 0.5;
        this.isPlaying = false;
        this.synthInterval = null;
        this.audioContext = null;
        this.usingSynth = false;

        this.button = document.getElementById("music-toggle");
        this.init();
    }

    init() {
        if (!this.button) return;

        // Determinar ruta relativa al audio según la profundidad de la URL actual
        const isSubdir = window.location.pathname.includes("/pages/");
        const audioPath = isSubdir ? `../${this.config.ruta}` : this.config.ruta;
        this.audioElement.src = audioPath;

        this.audioElement.addEventListener("error", () => {
            this.usingSynth = true;
        });

        this.button.addEventListener("click", () => {
            this.togglePlay();
        });

        // Reanudar música si estaba activa
        if (Storage.getMusicState()) {
            // Intentar reproducir si el navegador lo permite
            document.addEventListener("click", () => {
                if (!this.isPlaying && Storage.getMusicState()) {
                    this.play().catch(() => {});
                }
            }, { once: true });
        }
    }

    async togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            await this.play();
        }
    }

    async play() {
        try {
            if (!this.usingSynth) {
                await this.audioElement.play();
                this.isPlaying = true;
                Storage.setMusicState(true);
                this.updateUI(true);
                showToast(`🎶 Música: ${this.config.nombreTema}`, "🎵");
            } else {
                this.startHarpSynth();
                this.isPlaying = true;
                Storage.setMusicState(true);
                this.updateUI(true);
                showToast(`✨ Sinfonía Élfica de Aethelgard`, "🎶");
            }
        } catch (error) {
            this.usingSynth = true;
            this.startHarpSynth();
            this.isPlaying = true;
            Storage.setMusicState(true);
            this.updateUI(true);
            showToast(`✨ Sinfonía Élfica de Aethelgard`, "🎶");
        }
    }

    pause() {
        this.isPlaying = false;
        Storage.setMusicState(false);
        this.audioElement.pause();
        this.stopHarpSynth();
        this.updateUI(false);
    }

    updateUI(playing) {
        if (!this.button) return;
        if (playing) {
            this.button.classList.add("playing");
            this.button.setAttribute("title", "Pausar música");
        } else {
            this.button.classList.remove("playing");
            this.button.setAttribute("title", "Reproducir música");
        }
    }

    startHarpSynth() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!this.audioContext && AudioContextClass) {
            this.audioContext = new AudioContextClass();
        }
        if (this.audioContext && this.audioContext.state === "suspended") {
            this.audioContext.resume();
        }

        const chords = [
            [261.63, 329.63, 392.00, 523.25, 659.25],
            [220.00, 261.63, 329.63, 440.00, 523.25],
            [174.61, 220.00, 261.63, 349.23, 440.00],
            [196.00, 246.94, 293.66, 392.00, 493.88]
        ];

        let chordIndex = 0;
        let noteIndex = 0;

        const playNextHarpNote = () => {
            if (!this.isPlaying || !this.audioContext) return;

            const currentChord = chords[chordIndex];
            const freq = currentChord[noteIndex];
            this.playHarpPluck(freq);

            noteIndex++;
            if (noteIndex >= currentChord.length) {
                noteIndex = 0;
                chordIndex = (chordIndex + 1) % chords.length;
            }
        };

        this.synthInterval = setInterval(playNextHarpNote, 420);
        playNextHarpNote();
    }

    stopHarpSynth() {
        if (this.synthInterval) {
            clearInterval(this.synthInterval);
            this.synthInterval = null;
        }
    }

    playHarpPluck(frequency) {
        try {
            if (!this.audioContext) return;
            const ctx = this.audioContext;
            const now = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(frequency, now);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 1.6);
        } catch (e) {}
    }
}
