/**
 * ChatComponent is responsible for managing the chat interface, allowing users to connect,
 * send messages, and display received messages in a chat format.
 */
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../service/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  /**
   * The name of the user currently using the chat.
   * @type {string}
   */
  name: string = '';

  /**
   * A flag indicating whether the user is connected to the WebSocket service.
   * @type {boolean}
   */
  connected: boolean = false;

  /**
   * The current message being composed by the user.
   * @type {string}
   */
  message: string = '';

  /**
   * Array of messages received, each containing a name and content.
   * @type {Array<{ name: string, content: string }>}
   */
  messages: Array<{ name: string, content: string }> = [];

  /**
   * @param {WebsocketService} webSocketService - Service used for WebSocket communication.
   */
  constructor(private webSocketService: WebsocketService) {}

  /**
   * Connects the user to the WebSocket service and sets the connected flag to true.
   */
  connect() {
    this.webSocketService.connect((msg) => {
      this.messages.push(msg);
    });
    this.connected = true;
  }

  /**
   * Sends a message using the WebSocket service if the message is not empty.
   * Resets the message field after sending.
   */
  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.webSocketService.sendMessage(this.name, this.message);
      this.message = '';
    }
  }
}
