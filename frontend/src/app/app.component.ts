import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { environment } from '../environments/environment';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student Support Chatbot';
  userMessage = '';
  sending = false;
  messages: ChatMessage[] = [
    {
      text: 'Salut ! Je suis ton assistant pour les cours, examens et support technique. Comment puis-je t\'aider ? ',
      sender: 'bot',
      timestamp: new Date()
    }
  ];

  quickPrompts: string[] = [
    'Quand est le prochain examen ?',
    'Comment soumettre mon devoir ?',
    'Comment réinitialiser mon mot de passe ?',
    'Qui contacter pour un problème technique ?'
  ];

  constructor(private readonly http: HttpClient) {}

  sendPrompt(prompt: string): void {
    this.userMessage = prompt;
    this.sendMessage();
  }

  sendMessage(): void {
    const text = this.userMessage.trim();
    if (!text || this.sending) return;

    const outgoing: ChatMessage = {
      text,
      sender: 'user',
      timestamp: new Date()
    };
    this.messages = [...this.messages, outgoing];
    this.userMessage = '';
    this.sending = true;

    this.http
      .post<{ reply: string }>(environment.apiUrl, { message: text })
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
      next: res => {
        const reply: ChatMessage = {
          text: res.reply || 'Je regarde ça pour toi... (aucune réponse disponible)',
          sender: 'bot',
          timestamp: new Date()
        };
        this.messages = [...this.messages, reply];
        this.scrollToBottom();
      },
      error: err => {
        const reply: ChatMessage = {
          text: err?.error?.error || 'Impossible de joindre le serveur. Réessaie plus tard.',
          sender: 'bot',
          timestamp: new Date()
        };
        this.messages = [...this.messages, reply];
        this.scrollToBottom();
      }
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = document.querySelector('.chat-messages');
      if (container) container.scrollTop = container.scrollHeight;
    }, 0);
  }
}
