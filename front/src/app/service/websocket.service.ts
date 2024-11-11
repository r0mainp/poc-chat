/**
 * Service for managing WebSocket connections and communication.
 * Handles connecting to the server, subscribing to messages, and sending messages.
 */
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client;

  /**
   * Initializes the WebSocket client with the broker URL and WebSocket factory.
   */
  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/chat',
      webSocketFactory: () => new SockJS('http://localhost:8080/chat')
    });
  }

  /**
   * Connects to the WebSocket server and subscribes to the message topic.
   * @param {function(any): void} onNewMessage - Callback function to handle incoming messages.
   */
  connect(onNewMessage: (message: any) => void): void {
    this.client.onConnect = () => {
      this.client.subscribe('/topic/messages', (message) => {
        const msg = JSON.parse(message.body);
        onNewMessage(msg);
      });
    };
    this.client.activate();
  }

  /**
   * Sends a message to the server.
   * @param {string} name - The name of the sender.
   * @param {string} content - The content of the message.
   */
  sendMessage(name: string, content: string): void {
    const msg = { name, content };
    this.client.publish({ destination: '/app/message', body: JSON.stringify(msg) });
  }
}