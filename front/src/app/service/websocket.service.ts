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

  connect(cb: ()=> void): void {
    this.client.onConnect = () => {
      console.log('Connected to WebSocket');
      cb();
    };
    this.client.activate();
  }
}
