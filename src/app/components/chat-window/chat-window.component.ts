


// import { Component, OnInit } from '@angular/core';
// import { ChatService } from '../../services/chat.service';

// @Component({
//   selector: 'app-chat-window',
//   templateUrl: './chat-window.component.html',
//   styleUrls: ['./chat-window.component.css']
// })
// export class ChatWindowComponent implements OnInit {
//   selectedThread: any;

//   constructor(private chatService: ChatService) { }

//   ngOnInit() {
//     this.chatService.getSelectedThread().subscribe(thread => {
//       this.selectedThread = thread;
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

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
  imports: [FormsModule],
  standalone:true,
})
export class ChatWindowComponent implements OnInit {
  thread: Thread | undefined;
  newMessageText: string = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.getThread();
  }

  getThread(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chatService.getThread(id).subscribe((thread) => {
      this.thread = thread;
    });
  }

  sendMessage(): void {
    if (this.thread && this.newMessageText) {
      const message = {
        text: this.newMessageText,
        timestamp: new Date(),
        is_user: true
      };
      this.chatService.sendMessage(this.thread.id, message).subscribe((msg) => {
        this.thread?.messages.push(msg);
        this.newMessageText = '';
      });
    }
  }
}
