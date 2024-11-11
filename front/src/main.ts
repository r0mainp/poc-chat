import { bootstrapApplication } from '@angular/platform-browser';
import { ChatComponent } from './app/chat/chat.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(ChatComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));