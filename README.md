# Ship Scape 🚀

![Phaser](https://img.shields.io/badge/Phaser-3.55.2-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![License](https://img.shields.io/badge/license-MIT-green)
Ship Scape es un juego arcade retro desarrollado con Phaser 3 donde controlas una nave espacial que debe esquivar enemigos, recolectar power-ups y sobrevivir el mayor tiempo posible. El juego implementa Web Workers para optimizar el rendimiento en tareas específicas.
## 🎮 Características del Juego
- **Jugabilidad arcade clásica**: Controla tu nave con las flechas del teclado
- **Sistema de puntuación**: Gana puntos destruyendo naves enemigas
- **Power-ups**: Recolecta objetos especiales que aparecen aleatoriamente
- **Múltiples tipos de enemigos**: Diferentes naves con animaciones únicas
- **Efectos visuales**: Explosiones, animaciones y efectos de partículas
- **Música y efectos de sonido**: Ambientación retro con audio inmersivo
## 🛠️ Tecnologías Utilizadas
- **Phaser 3**: Framework principal para el desarrollo del juego
- **Web Workers**: Para optimización de procesos en segundo plano:
  - Movimiento del fondo parallax
  - Temporizador de juego
  - Sistema de mensajes
## 📁 Estructura del Proyecto

├── index.html  
├── game.js # Configuración principal del juego  
├── scenes/  
│ ├── MenuScene.js # Escena del menú principal  
│ ├── Scene1.js # Escena de carga (bootGame)  
│ └── Scene2.js # Escena principal del juego (playGame)  
├── models/  
│ ├── Player.js # Lógica del jugador  
│ ├── Ship.js # Gestión de naves enemigas  
│ ├── Beam.js # Proyectiles del jugador  
│ ├── Explosion.js # Efectos de explosión  
│ └── Music.js # Gestión de audio  
├── workers/  
│ ├── backgroundPosition.js # Worker para movimiento del fondo  
│ ├── timeWorker.js # Worker para el temporizador  
│ └── textWorker.js # Worker para mensajes del juego  
├── assets/  
│ ├── images/ # Imágenes del juego  
│ ├── spritesheets/ # Sprites animados  
│ ├── sounds/ # Efectos de sonido y música  
│ └── font/ # Fuentes bitmap

text

## 🎯 Controles
- **Flechas ↑ ↓**: Movimiento vertical de la nave
- **Flechas ← →**: Movimiento horizontal (velocidad reducida)
- **Barra espaciadora**: Disparar proyectiles
## ⚙️ Configuración del Juego
```javascript
export const gameSettings = {
    playerSpeed: 200,      // Velocidad del jugador
    beamSpeed: 250,        // Velocidad de los proyectiles
};
```

## 🚀 Instalación y Ejecución

1. **Clona el repositorio**
    
    ```bash
    
    git clone https://github.com/xChrisxY/ship-scape.git
    cd ship-scape
    ```
    
2. **Instala un servidor local** (opcional pero recomendado)
    
    ```bash
    
    # Usando Python
    python -m http.server 8000
    # Usando Node.js
    npx http-server
    ```
    
3. **Abre el juego en tu navegador**
    
    ```text
    
    http://localhost:8000
    ```

## 🎨 Assets y Recursos

- **Sprites**: Todos los sprites están en formato PNG con transparencia
    
- **Fuentes**: Utiliza fuentes bitmap para el estilo retro
    
- **Sonidos**: Formatos OGG y MP3 para compatibilidad multiplataforma
    

## 🧠 Implementación de Web Workers

El proyecto utiliza tres Web Workers para optimizar el rendimiento:

### 1. backgroundPosition.js

```javascript

// Controla el movimiento parallax del fondo
self.onmessage = event => {
    const speed = event.data;
    setInterval(() => {
        backgroundPosition -= speed;
        postMessage(backgroundPosition);
    }, 1000 / 60);
};
```

### 2. timeWorker.js

```javascript

// Gestiona el temporizador del juego
self.onmessage = event => {
    const action = event.data;
    if (action === 'start') {
        // Inicia el contador
    } else if (action === 'reset') {
        // Reinicia el tiempo
    }
};
```

### 3. textWorker.js

```javascript

// Maneja los mensajes temporales en pantalla
self.onmessage = event => {
    const { message } = event.data;
    postMessage(message);
    setTimeout(() => {
        postMessage('');
    }, 3000);
};
```

## 🎯 Mecánicas del Juego

### Sistema de Puntuación

- +15 puntos por cada nave enemiga destruida
- Visualización en formato de 6 dígitos (SCORE 000000)

### Sistema de Vida

- El jugador tiene 1 vida
- Al colisionar con un enemigo, aparece un mensaje "Dead! try again"
- El jugador se reinicia después de 1 segundo con un efecto de aparición

### Power-ups

- Dos tipos: rojo y gris
- Movimiento aleatorio por la pantalla
- Rebotan en los bordes del mundo
