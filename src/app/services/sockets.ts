import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Message } from '../model/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Sockets {
  private socket: Socket;
  messages = signal<Message[]>([]);
  private readonly apiserver = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.apiserver);
  }

  sendMessage(message: string) {
    this.socket.emit('new_message', message);
  }

  getMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('new_message', (message: string) => {
        observer.next(message);
      });
    });
  }
}
