// import { Component, OnInit } from '@angular/core';
// import { ChatService } from 'src/app/services/chat.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit {

//   breadCrumbItems: Array<{}> = [];
//   isReadMore: true = true;

//     threads : any;
//   selectedThread: any;

//   constructor(private chatService: ChatService) { }

//   ngOnInit() {
//     this.breadCrumbItems = [{ label: 'Home' }, { label: 'Inbox', active: true }];

//     this.chatService.getThreads().subscribe(threads => {
//       this.threads = threads;
//     });
//     this.chatService.getSelectedThread().subscribe(thread => {
//       this.selectedThread = thread;
//     });
//   }

//   selectThread(thread:any) {
//     this.chatService.selectThread(thread);
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

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
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [RouterLink,NgFor],
  standalone:true,
})
export class ChatComponent implements OnInit {
  threads: Thread[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getThreads();
  }

  getThreads(): void {
    this.chatService.getThreads().subscribe((threads) => {
      this.threads = threads;
    });
  }
}
