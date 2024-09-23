let messageSend = "";

self.onmessage = event => {

      const { message } = event.data;
      console.log("recibimos un mensaje");
      messageSend = message;
  
      postMessage(message);
      
      setTimeout(() => {
          postMessage('');
          console.log("hello");
      }, 3000);
};
  