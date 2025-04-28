import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { PagetiltleComponent } from "../pagetiltle/pagetiltle.component";

@Component({
  selector: 'app-groups-view',
  imports: [CommonModule, NgFor, NgIf, MatIcon, FormsModule, PagetiltleComponent],
  templateUrl: './groups-view.component.html',
  styleUrl: './groups-view.component.css'
})
export class GroupViewComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  // Current User
  currentUser = {
    id: 'user1',
    name: 'You',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'member',
    interests: ['Math', 'Science']
  };

  // Chat Data
  messages = [
    {
      id: '1',
      sender: 'user2',
      text: 'Has everyone completed the calculus assignment?',
      time: new Date(Date.now() - 3600000),
      reactions: [],
      image: null
    },
    {
      id: '2',
      sender: 'user1',
      text: 'I need help with question #3 about derivatives',
      time: new Date(Date.now() - 1800000),
      reactions: [],
      image: null

    },
    {
      id: '3',
      sender: 'user3',
      text: 'I can help with that! Here\'s a resource that might help:',
      time: new Date(Date.now() - 1200000),
      file: {
        name: 'Derivatives_Guide.pdf',
        size: 2500000,
        type: 'application/pdf'
      },
      reactions: [],
      image: null

    }
  ];
breadCrumbItems: any;
  get onlineMembersCount() {
    return this.members.filter(m => m.isOnline).length;
  }
  // Group Data
  members = [
    { id: 'user1', name: 'You', avatar: 'https://i.pravatar.cc/150?img=1', isAdmin: false, isOnline: true },
    { id: 'user2', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=5', isAdmin: true, isOnline: true },
    { id: 'user3', name: 'Dr. Smith', avatar: 'https://i.pravatar.cc/150?img=30', isAdmin: false, isOnline: false, isMentor: true }
  ];

  // Study Materials
  materials = [
    { id: '1', name: 'Calculus Textbook', type: 'pdf', size: '5.2 MB', uploadedBy: 'Dr. Smith', date: '2024-03-10' },
    { id: '2', name: 'Chemistry Lab Guidelines', type: 'doc', size: '2.1 MB', uploadedBy: 'Prof. Lee', date: '2024-03-15' }
  ];

  // Mentorship
  availableMentors = [
    { 
      id: 'user3', 
      name: 'Dr. Smith', 
      avatar: 'https://i.pravatar.cc/150?img=30', 
      expertise: ['Calculus', 'Physics'],
      availability: ['Mon', 'Wed', 'Fri']
    }
  ];

  upcomingEvents = [
    { id: '1', title: 'Calculus Help Session', date: new Date(Date.now() + 86400000), organizer: 'Dr. Smith' },
    { id: '2', title: 'Weekly Study Group', date: new Date(Date.now() + 172800000), organizer: 'Alex Johnson' }
  ];

  // UI State
  newMessage = '';
  mediaPreview: { type: string, url?: SafeUrl, file?: File } | null = null;
  activeCategory = 'All';
  categories = ['All', 'Math', 'Science', 'Assignments'];
  showMentorModal = false;
  selectedMentor: any = null;

  // Forms
  messageForm: FormGroup;
  sessionRequestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {
    this.messageForm = this.fb.group({
      message: ['']
    });

    this.sessionRequestForm = this.fb.group({
      topic: ['', Validators.required],
      preferredDate: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }

  sendMessage(event?: KeyboardEvent): void {
    if (event && event.shiftKey) return;
    if (!this.newMessage.trim() && !this.mediaPreview) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: this.currentUser.id,
      text: this.newMessage,
      time: new Date(),
      reactions: []
    };

    if (this.mediaPreview) {
      if (this.mediaPreview.type === 'image') {
        // newMsg['image'] = this.mediaPreview.url;
      } else if (this.mediaPreview.type === 'file') {
        // newMsg['file'] = {
        //   name: this.mediaPreview.file?.name || 'file',
        //   size: this.mediaPreview.file?.size || 0,
        //   type: this.mediaPreview.file?.type || ''
        // };
      }
    }

    // this.messages.push(newMsg);
    this.newMessage = '';
    this.mediaPreview = null;
  }

  handleImageInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type.match('image.*')) {
        const url = URL.createObjectURL(file);
        this.mediaPreview = {
          type: 'image',
          url: this.sanitizer.bypassSecurityTrustUrl(url),
          file: file
        };
      }
    }
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.mediaPreview = {
        type: 'file',
        file: file
      };
    }
  }

  clearMediaPreview(): void {
    if (this.mediaPreview?.type === 'image') {
      URL.revokeObjectURL(this.mediaPreview.url as string);
    }
    this.mediaPreview = null;
  }

  downloadFile(file: any): void {
    // Implement actual download logic
    this.snackBar.open(`Downloading ${file.name}...`, 'Close', { duration: 3000 });
  }

  openLightbox(imageUrl: SafeUrl | string): void {
    // Implement lightbox viewer
    console.log('Opening image:', imageUrl);
  }

  getUser(userId: string): any {
    return this.members.find(member => member.id === userId) || 
           { name: 'Unknown', avatar: 'https://i.pravatar.cc/150?img=0' };
  }

  getResourceIcon(type: string): string {
    switch(type) {
      case 'pdf': return 'picture_as_pdf';
      case 'doc': return 'description';
      case 'video': return 'videocam';
      default: return 'insert_drive_file';
    }
  }

  requestMentorSession(mentor: any): void {
    this.selectedMentor = mentor;
    this.showMentorModal = true;
  }

  submitSessionRequest(): void {
    if (this.sessionRequestForm.valid) {
      const request = {
        mentor: this.selectedMentor,
        ...this.sessionRequestForm.value,
        requester: this.currentUser
      };
      
      // Send request to backend
      console.log('Session request:', request);
      
      this.snackBar.open(
        `Session requested with ${this.selectedMentor.name}`,
        'Close',
        { duration: 5000 }
      );
      
      this.showMentorModal = false;
      this.sessionRequestForm.reset();
    }
  }

  addReaction(message: any, emoji: string): void {
    if (!message.reactions) message.reactions = [];
    const existing = message.reactions.find((r: any) => r.userId === this.currentUser.id);
    
    if (existing) {
      existing.emoji = emoji;
    } else {
      message.reactions.push({
        emoji,
        userId: this.currentUser.id
      });
    }
  }

  get filteredResources() {
    if (this.activeCategory === 'All'){
      return this.materials;
    } 
    // return this.materials.filter(m => m.tags?.includes(this.activeCategory));
    return []
  }
}