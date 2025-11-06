export class WSClient {
  private ws?: WebSocket;
  constructor(private url: string) {}

  connect(onMessage: (data: any) => void) {
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = (msg) => onMessage(JSON.parse(msg.data));
  }

  send(data: any) {
    this.ws?.send(JSON.stringify(data));
  }
}
