import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messageForm!: FormGroup;
  messages$ = this.messageService.messages$;
  isSubmitting = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // Only run the following code in the browser, not during prerendering
    if (isPlatformBrowser(this.platformId)) {
      this.messageForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        content: ['', [Validators.required, Validators.minLength(5)]]
      });

      // Trigger loading messages only on the client side
      this.messageService.loadMessages();
    }
  }

  async onSubmit() {
    if (this.messageForm.valid && !this.isSubmitting) {
      try {
        this.isSubmitting = true;
        await this.messageService.sendMessage(this.messageForm.value);
        this.messageForm.reset();
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
