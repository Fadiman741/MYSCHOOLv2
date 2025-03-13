export interface Message {
    id: number;
    sender: { id: number, username: string };
    receiver: { id: number, username: string };
    content: string;
    timestamp: string;
  }