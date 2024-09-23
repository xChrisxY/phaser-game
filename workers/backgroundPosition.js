let backgroundPosition = 0;

self.onmessage = event => {

      // Recibimos la velocidad del fondo desde el hilo principal
      const speed = event.data;

      setInterval(() => {

            backgroundPosition -= speed;
            postMessage(backgroundPosition);

      }, 1000 / 60);


}