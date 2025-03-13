
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';

interface Message {
  text: string;
  timestamp: Date;
  is_user: boolean;
}

interface Thread {
  id: number;
  other_user: string;
  messages: Message[];
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  imports: [FormsModule,NgClass,NgFor],
  standalone:true,
})
export class ChatWindowComponent implements OnInit {
  thread: Thread | undefined;
  newMessageText: string = '';
  messages = [
    { sender: 'John Doe', text: 'Hey, how are you?', timestamp: '10:00 AM' },
    { sender: 'You', text: 'I am good, thanks!', timestamp: '10:01 AM' },
    { sender: 'John Doe', text: 'Great to hear!', timestamp: '10:02 AM' }
  ];
  newMessage = '';

  

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  
  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'You', text: this.newMessage, timestamp: new Date().toLocaleTimeString() });
      this.newMessage = '';
    }
  }
}
