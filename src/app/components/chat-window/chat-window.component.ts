
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';;
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

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
  imports: [CommonModule, FormsModule,NgClass,NgFor,NgIf,MatIcon],
  standalone:true,
})
export class ChatWindowComponent  {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  thread: Thread | undefined;
  newMessageText: string = '';
  // messages = [
  //   { sender: 'John Doe', text: 'Hey, how are you?', timestamp: '10:00 AM' },
  //   { sender: 'You', text: 'I am good, thanks!', timestamp: '10:01 AM' },
  //   { sender: 'John Doe', text: 'Great to hear!', timestamp: '10:02 AM' }
  // ];
  messages= [
    {
      sender: 'John Doe',
      text: 'Hey there! How are you doing?',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read',
      file: null,
      image:null
    },
    {
      sender: 'You',
      text: 'I\'m good, thanks! Just working on some Angular projects.',
      timestamp: new Date(Date.now() - 1800000),
      status: 'read',
      file: null,
      image:null

    },
    {
      sender: 'John Doe',
      text: 'That sounds interesting! What kind of projects?',
      timestamp: new Date(Date.now() - 1200000),
      status: 'read',
      file: null,
      image:null


    }
  ];
  newMessage = '';
  mediaPreview:  null = null;
  

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  sendMessage(event?: KeyboardEvent): void {
    if (event && event.shiftKey) {
      return; // Allow new lines with shift+enter
    }

    if ((!this.newMessage && !this.mediaPreview) || (event && event.key === 'Enter' && event.shiftKey)) {
      return;
    }

    event?.preventDefault();

    const newMsg= {
      sender: 'You',
      text: this.newMessage,
      timestamp: new Date(),
      status: 'sent'
    };

    // if (this.mediaPreview) {
    //   if (this.mediaPreview.type === 'image') {
    //     newMsg.image = this.mediaPreview.url;
    //   } else if (this.mediaPreview.type === 'file') {
    //     newMsg.file = {
    //       name: this.mediaPreview.file.name,
    //       size: this.mediaPreview.file.size,
    //       type: this.mediaPreview.file.type
    //     };
    //   }
    // }

    // this.messages.push(newMsg);
    this.newMessage = '';
    this.mediaPreview = null;

    // Simulate message delivery and read status
    setTimeout(() => {
      newMsg.status = 'delivered';
    }, 1000);

    setTimeout(() => {
      newMsg.status = 'read';
    }, 2000);
  }

  handleImageInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type.match('image.*')) {
        const url = URL.createObjectURL(file);
        // this.mediaPreview = {
        //   type: 'image',
        //   url: this.sanitizer.bypassSecurityTrustUrl(url),
        //   file: file
        // };
      }
      input.value = ''; // Reset input
    }
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // this.mediaPreview = {
      //   type: 'file',
      //   file: file
      // };
      input.value = ''; // Reset input
    }
  }

  clearMediaPreview(): void {
    // if (this.mediaPreview?.type === 'image') {
    //   URL.revokeObjectURL(this.mediaPreview.url as string);
    // }
    // this.mediaPreview = null;
  }

  clearText(): void {
    this.newMessage = '';
  }

  openMediaViewer(imageUrl: SafeUrl | string): void {
    // Implement your media viewer logic here
    console.log('Opening media viewer for:', imageUrl);
  }

  downloadFile(file: File | FileInfo): void {
    // Implement file download logic
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      console.log('Downloading:', file.name);
      // Implement your file download logic for server-stored files
    }
  }
}

// Interfaces
// interface Message {
//   sender: string;
//   text?: string;
//   image?: SafeUrl | string;
//   file?: FileInfo;
//   timestamp: Date;
//   status: 'sent' | 'delivered' | 'read';
// }

interface FileInfo {
  name: string;
  size: number;
  type: string;
}

interface MediaPreview {
  type: 'image' | 'file';
  url?: SafeUrl | string;
  file?: File;
}


