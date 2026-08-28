/**
 * 🌿 CONFIGURACIÓN PRINCIPAL — CARTA DE CUMPLEAÑOS ÉLFICA
 * 
 * Modifica libremente cualquier valor de este archivo para personalizar
 * el nombre, la edad, los mensajes, las fotos, los secretos y la música.
 */

export const CONFIG = {
    // 🧝‍♀️ Datos de la persona festejada
    nombre: "Xiaruno",
    autor: "Rygogamer",
    edad: 25,
    tituloBosque: "El Bosque Encantado de Aethelgard",

    // 🌲 Escena 1: Introducción
    intro: {
        frase1: "El bosque guarda un secreto milenario...",
        frase2: "Y hoy las estrellas se han alineado para revelártelo.",
        botonEntrar: "✨ ENTRAR AL BOSQUE",
        tooltip: "Toca para cruzar el velo de la magia"
    },

    // 🚪 Escena 2: Puerta Élfica & Runas
    gate: {
        titulo: "El Portal de las Runas Ancestrales",
        subtitulo: "Solo quien despierte las cuatro runas sagradas abrirá el sendero del destino.",
        instruccion: "Toca cada runa mágica para encender su luz interior:",
        runas: [
            { id: "sylvan", simbolo: "ᚱ", nombre: "Runa Sylvan", significado: "Fuerza y naturaleza viva" },
            { id: "lunar", simbolo: "ᛗ", nombre: "Runa Lunaria", significado: "Claridad y serenidad" },
            { id: "astral", simbolo: "ᛟ", nombre: "Runa Astralis", significado: "Destino y bendición estelar" },
            { id: "floris", simbolo: "ᛉ", nombre: "Runa Floralia", significado: "Alegría y nuevo florecer" }
        ],
        botonAbrir: "✨ ABRIR EL PORTAL ÉLFICO",
        mensajeAbierto: "¡Las raíces han respondido! El sendero se ha revelado..."
    },

    // 💌 Escena 3: Carta Élfica capitular
    carta: {
        titulo: "Feliz Cumpleaños",
        subtitulo: "Un mensaje tejido con rocío de luna y hojas de roble antiguo",
        capitulos: [
            {
                numero: "Capítulo I",
                titulo: "El Despertar del Bosque",
                contenido: "Hoy el bosque despertó diferente. Las copas de los robles antiguos danzaron con una brisa tibia y los arroyos susurraron una melodía que solo se canta una vez al año."
            },
            {
                numero: "Capítulo II",
                titulo: "La Danza de las Luciérnagas",
                contenido: "Al caer el crepúsculo, miles de pequeñas luces doradas comenzaron a flotar entre los helechos, guiando a todos los espíritus de la naturaleza hacia un mismo claro encantado."
            },
            {
                numero: "Capítulo III",
                titulo: "El Eco en los Cristales",
                contenido: "Los espíritus del bosque grabaron tu nombre en las piedras de luz. Recordaron cada sonrisa, cada momento brillante y cada paso que te ha traído hasta este nuevo ciclo de tu vida."
            },
            {
                numero: "Capítulo IV",
                titulo: "El Florecer de un Nuevo Año",
                contenido: "Porque hoy celebramos la existencia de un ser extraordinario. Que tus días estén siempre colmados de paz, salud, amor incondicional y esa magia única que solo tú sabes transmitir al mundo."
            }
        ],
        firma: "Con todo el cariño de quienes te admiran y quieren, en este y en todos los mundos."
    },

    // 📖 Escena 4: Galería de Recuerdos
    galeria: {
        titulo: "Los Recuerdos del Bosque",
        subtitulo: "Momentos preciosos inmortalizados en los cristales de la memoria",
        fotos: [
            {
                id: 1,
                titulo: "Chispas de Alegría",
                fecha: "Un instante eterno",
                descripcion: "Aquellos días donde las risas resonaron más fuerte que el viento entre las hojas.",
                src: "assets/images/gallery/foto1.jpg",
                categoria: "Aventuras"
            },
            {
                id: 2,
                titulo: "Bajo la Luz de la Luna",
                fecha: "Noche de sueños",
                descripcion: "Cada paso que has dado te ha convertido en la persona maravillosa, valiente y brillante que eres hoy.",
                src: "assets/images/gallery/foto2.jpg",
                categoria: "Magia"
            },
            {
                id: 3,
                titulo: "Destellos de Magia",
                fecha: "Recuerdo dorado",
                descripcion: "Los mejores recuerdos no se desvanecen; se transforman en luz que guía el camino.",
                src: "assets/images/gallery/foto3.jpg",
                categoria: "Amistad"
            },
            {
                id: 4,
                titulo: "El Gran Florecer",
                fecha: "Nuevo ciclo",
                descripcion: "Que cada nuevo amanecer te traiga razones infinitas para sonreír y soñar en grande.",
                src: "assets/images/gallery/foto4.jpg",
                categoria: "Celebración"
            }
        ]
    },

    // 🔮 Escena 5: Sistema de Secretos
    secretos: {
        total: 6,
        titulo: "Misterios Ocultos del Bosque",
        subtitulo: "Explora la escena con atención para despertar los 6 secretos",
        lista: [
            { id: "runa", nombre: "Runa Oculta de Musgo", pista: "Brilla entre las raíces de la esquina izquierda.", mensaje: "¡Has descubierto la Runa Oculta de la Prosperidad! 🌟" },
            { id: "mariposa", nombre: "Mariposa de Luz", pista: "Revolotea cerca de las flores mágicas.", mensaje: "¡La mariposa de luz te bendice con ligereza y gracia! 🦋" },
            { id: "luciernaga", nombre: "Espíritu de Luciérnaga", pista: "Una chispa dorada flota en el firmamento.", mensaje: "¡El espíritu de la luciérnaga te susurra una promesa de felicidad! ✨" },
            { id: "flor", nombre: "Flor de Cristal Lunar", pista: "Tócala 3 veces seguidas para verla florecer.", mensaje: "¡La flor lunar ha florecido revelando su esencia pura! 🌸" },
            { id: "luna", nombre: "Bendición Lunar", pista: "Toca la gran luna plateada en la noche.", mensaje: "¡La luna ha iluminado todo el bosque con su aura etérea! 🌙" },
            { id: "cristal", nombre: "Cristal Resonante", pista: "Un prisma azulado vibra cerca del sendero.", mensaje: "¡El cristal emite un canto de armonía y protección! 💎" }
        ],
        recompensaCompleta: "¡Fascinante! Has descubierto todos los secretos del bosque. Se ha desbloqueado la bendición ancestral."
    },

    // 🎂 Escena 6: Torta Élfica
    torta: {
        titulo: "El Manjar de las Hadas",
        subtitulo: "Forjada con pétalos de luna, bayas silvestres y miel dorada",
        instruccionVelas: "🕯️ Haz clic o toca las velas para apagar la llama y pedir tu deseo",
        textoDeseo: "Pide un deseo con todo tu corazón... ✨",
        bendicionDeseo: "Que la magia del bosque te acompañe durante todo este nuevo año de vida. Tus deseos han sido confiados a las estrellas."
    },

    // 🧚‍♀️ Elfa Guía
    guia: {
        nombre: "Lyra",
        dialogos: {
            bienvenida: "¡Bienvenida al bosque! Sígueme, hay muchas maravillas esperándote.",
            portal: "Toca las cuatro runas en el arco para abrir el camino...",
            carta: "Aquí descansa el pergamino ancestral. Lee cada capítulo con calma.",
            secretos: "Psst... creo que hay algo brillante escondido cerca de aquí.",
            torta: "¡Es hora de apagar las velas! ¿Ya tienes listo tu deseo?",
            final: "¡Gracias por visitar nuestro bosque! Nunca olvides lo especial que eres."
        }
    },

    // 🌠 Escena 7: Escena Final & Gran Secreto
    final: {
        titulo: "¡Feliz Cumpleaños!",
        mensajePrincipal: "Que este nuevo capítulo de tu historia esté lleno de momentos hermosos, personas especiales, aventuras inesperadas y miles de motivos para sonreír.",
        fraseRecordar: "Y recuerda...",
        fraseMagica: "Siempre habrá un pequeño rincón mágico esperándote en este bosque. 🌿",
        botonUltimoSecreto: "🌙 Descubrir el último secreto",
        ultimoSecreto: {
            titulo: "El Secreto del Corazón del Bosque",
            mensaje: "El regalo más grande no reside en los hechizos ni en las estrellas, sino en el brillo único, cálido y bondadoso que dejas en cada persona que tiene la fortuna de conocerte. ¡Que tengas el cumpleaños más feliz y maravilloso de todos! 💖✨",
            firma: "— Con infinito aprecio y cariño 🧝‍♀️✨"
        }
    },

    // 🎵 Configuración de Música y Audio
    musica: {
        ruta: "assets/audio/birthday-theme.mp3",
        nombreTema: "Sinfonía de Aethelgard",
        volumenInicial: 0.5,
        sintetizadorFallback: true // Si el archivo MP3 no se encuentra, activa el sintetizador de arpa y campanas Web Audio
    }
};
