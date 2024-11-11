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
  name: string = '';
  connected: boolean = false;
  message: string = '';
  messages: Array<{ name: string, content: string }> = [];

  constructor(private webSocketService: WebsocketService) {}

  connect() {
    this.webSocketService.connect((msg) => {
      this.messages.push(msg);
    });
    this.connected = true;
  }

  sendMessage(): void {
    if (this.message.trim() !== '') {
      this.webSocketService.sendMessage(this.name, this.message);
      this.message = '';
    }
  }
}
