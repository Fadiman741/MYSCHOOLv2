// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface Message {
//   text: string;
//   timestamp: Date;
//   is_user: boolean;
// }

// interface Thread {
//   id: number;
//   other_user: string;
//   messages: Message[];
// }


// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {
  // private threads = new BehaviorSubject<any[]>([]);
  // private selectedThread = new BehaviorSubject<any>(null);

  // private apiUrl = 'http://localhost:8000/api';

  // constructor(private http: HttpClient) {
    // Sample data
    //   this.threads.next([
    //     {
    //       id: 1,
    //       otherUser: 'User1',
    //       messages: [
    //         { text: 'Hello', timestamp: new Date(), isUser: true },
    //         { text: 'Hi', timestamp: new Date(), isUser: false }
    //       ]
    //     },
    //     {
    //       id: 2,
    //       otherUser: 'User2',
    //       messages: [
    //         { text: 'Hello hello', timestamp: new Date(), isUser: true },
    //         { text: 'Hi there', timestamp: new Date(), isUser: false }
    //       ]
    //     },
    //     {
    //       id: 3,
    //       otherUser: 'User3',
    //       messages: [
    //         { text: 'Hello there user 3', timestamp: new Date(), isUser: true },
    //         { text: 'Hi', timestamp: new Date(), isUser: false }
    //       ]
    //     },
    //     {
    //       id: 4,
    //       otherUser: 'User4',
    //       messages: [
    //         { text: 'Hello there user 4', timestamp: new Date(), isUser: true },
    //         { text: 'Hi there', timestamp: new Date(), isUser: false }
    //       ]
    //     }
    //   ]);
    // }

    // getThreads() {
    //   return this.threads.asObservable();
    // }

    // getSelectedThread() {
    //   return this.selectedThread.asObservable();
    // }

    // selectThread(thread:any) {
    //   this.selectedThread.next(thread);
    // }
    
    // getThreads(): Observable < Thread[] > {
    //   return this.http.get<Thread[]>(`${this.apiUrl}/threads/`);
    // }

    // getThread(threadId: number): Observable < Thread > {
    //   return this.http.get<Thread>(`${this.apiUrl}/threads/${threadId}/`);
    // }

    // sendMessage(threadId: number, message: Message): Observable < Message > {
    //   return this.http.post<Message>(`${this.apiUrl}/messages/`, { ...message, thread: threadId });
    // }

//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/threads/`);
  }

  getThread(threadId: number): Observable<Thread> {
    return this.http.get<Thread>(`${this.apiUrl}/threads/${threadId}/`);
  }

  sendMessage(threadId: number, message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages/`, { ...message, thread: threadId });
  }
}
