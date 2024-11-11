import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs"

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/chat',
      webSocketFactory: () => new SockJS('http://localhost:8080/chat')
    })
  }

  connect(onNewMessage: (message: any) => void): void {
    this.client.onConnect = () => {
      this.client.subscribe('/topic/messages', (message) => {
        const msg = JSON.parse(message.body);
        onNewMessage(msg);
      });
    };
    this.client.activate();
  }

  sendMessage(name: string, content: string): void {
    const msg = { name, content };
    this.client.publish({ destination: '/app/message', body: JSON.stringify(msg) });
  }
}
