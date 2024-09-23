let timerId;
let elapsedTime = 0;

self.onmessage = event => {

      const action = event.data;

      if (action === 'start') {

            if (!timerId) {

                timerId = setInterval(() => {

                    elapsedTime += 1000; 
                    self.postMessage(elapsedTime);

                }, 1000); 
            }
        } else if (action === 'stop') {

            clearInterval(timerId);

            timerId = null;

        } else if (action === 'reset') {

            elapsedTime = 0;

        }

}     