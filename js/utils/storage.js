/**
 * 💾 Gestor de Persistencia y Progreso de la Aventura
 */

export const Storage = {
    // Claves de etapas
    STAGES: {
        FOREST: "forestVisited",
        FAIRY: "fairyMet",
        PATH: "pathCompleted",
        PORTAL: "portalUnlocked",
        GARDEN: "gardenCompleted",
        MEMORIES: "memoriesViewed",
        CAKE: "birthdayCakeCompleted",
        LETTER: "letterUnlocked"
    },

    setStage(stageKey, value = "true") {
        try {
            localStorage.setItem(stageKey, value);
        } catch (e) {}
    },

    getStage(stageKey) {
        try {
            return localStorage.getItem(stageKey) === "true";
        } catch (e) {
            return false;
        }
    },

    // Gestión de Secretos
    getSecrets() {
        try {
            const data = localStorage.getItem("aethelgard_discovered_secrets");
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    },

    saveSecret(secretId) {
        try {
            const secrets = this.getSecrets();
            if (!secrets.includes(secretId)) {
                secrets.push(secretId);
                localStorage.setItem("aethelgard_discovered_secrets", JSON.stringify(secrets));
            }
            return secrets;
        } catch (e) {
            return [];
        }
    },

    hasSecret(secretId) {
        return this.getSecrets().includes(secretId);
    },

    // Música persistente
    getMusicState() {
        try {
            return localStorage.getItem("aethelgard_music_playing") === "true";
        } catch (e) {
            return false;
        }
    },

    setMusicState(playing) {
        try {
            localStorage.setItem("aethelgard_music_playing", playing ? "true" : "false");
        } catch (e) {}
    },

    // Reiniciar aventura completa
    resetAll() {
        try {
            localStorage.clear();
        } catch (e) {}
    }
};
