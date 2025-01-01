class WebSocketService {
  constructor() {
    this.socketUrl = "ws://localhost:8000/ws";
    this.socket = null;
    this.listeners = [];
    this.isConnected = false;

    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 5000;

    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.socketUrl);

    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
    this.socket.onerror = this.onError;
    this.socket.onclose = this.onClose;
  }

  onOpen = () => {
    this.isConnected = true;
    this.reconnectAttempts = 0;
    console.log('WebSocket opened');
  };

  onMessage = (event) => {
    const data = JSON.parse(event.data);
    this.listeners.forEach((listener) => listener(data));
  };

  onError = (error) => {
    alert('서버 에러:', error);
    console.error('WebSocket error:', error);
  };

  onClose = () => {
    this.isConnected = false;
    console.log('WebSocket closed');

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      console.log(`Reconnecting... attempt ${this.reconnectAttempts + 1}`);
      setTimeout(() => {
        this.reconnectAttempts += 1;
        this.connect();
      }, this.reconnectDelay);
    } else {
      alert('서버 연결에 실패했습니다. 서버 상태를 확인해주세요.');
    }
  };

  sendMessage = (message) => {
    if (this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(message));
      } catch (error) {
        alert('서버 에러:', error);
        console.error('WebSocket error:', error);
      }
    } else {
      alert("서버 연결에 실패했습니다.");
      console.error("WebSocket is not open.");
    }
  };

  waitForOpen = () => {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve();
      } else {
        this.socket.onopen = () => {
          this.isConnected = true;
          console.log('WebSocket opened');
          resolve();
        };
        this.socket.onerror = (error) => {
          reject(new Error("WebSocket connection failed"));
        };
      }
    });
  };

  addListener = (listener) => {
    this.listeners.push(listener);
  };

  closeConnection = () => {
    this.socket.close();
  };
}

const instance = new WebSocketService();

export default instance;
