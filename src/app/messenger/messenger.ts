import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sockets } from '../services/sockets';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './messenger.html',
  styleUrl: './messenger.css',
})
export class Messenger implements OnInit {
  private socketService = inject(Sockets);
  message = signal('');
  messageHistory = signal<string[]>([]);

  ngOnInit() {
    this.socketService.getMessage().subscribe((message: string) => {
      this.messageHistory.update((messages) => [...messages, message]);
    });
  }

  sendMessage() {
    if (!this.message().trim()) return;
    this.socketService.sendMessage(this.message());
    this.message.set('');
  }
}
