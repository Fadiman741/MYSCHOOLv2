

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [RouterLink,NgFor,FormsModule,MatIcon,NgIf],
  standalone:true,
})
export class ChatComponent implements OnInit {
  messages = [];
  recentChats = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', timestamp: '10:00 AM' },
    { id: 2, name: 'Jane Smith', lastMessage: 'See you later!', timestamp: '9:30 AM' },
    { id: 3, name: 'Alice Johnson', lastMessage: 'Thanks for the help!', timestamp: 'Yesterday' }
  ]

  constructor(private chatService: ApiService) { }

  ngOnInit(): void {  
  }

  filteredChats = [...this.recentChats]; // Copy of recentChats for filtering
  searchQuery = '';

  // Function to delete a chat
  deleteChat(chatId: number) {
    this.recentChats = this.recentChats.filter(chat => chat.id !== chatId);
    this.filteredChats = this.recentChats; // Update filtered list
  }

  // Function to search chats
  searchChats() {
    this.filteredChats = this.recentChats.filter(chat =>
      chat.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Function to clear search
  clearSearch() {
    this.searchQuery = '';
    this.filteredChats = this.recentChats;
  }
  loadMessages(): void {
    this.chatService.getMessages().subscribe(
      (data) => this.messages = data,
      (error) => console.error('Error fetching messages', error)
    );
  }

  // deleteMessage(id: number): void {
  //   this.chatService.deleteMessage(id).subscribe(
  //     () => this.messages = this.messages.filter(msg => msg.id !== id),
  //     (error) => console.error('Error deleting message', error)
  //   );
  // }
}
