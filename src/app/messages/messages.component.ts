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
  isRecording = false;
  recognition: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Khởi tạo Web Speech API
      const SpeechRecognition = (window as any).SpeechRecognition || 
                               (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'vi-VN';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          const currentContent = this.messageForm.get('content')?.value || '';
          this.messageForm.patchValue({
            content: currentContent + ' ' + transcript
          });
        };

        this.recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          this.isRecording = false;
        };

        this.recognition.onend = () => {
          this.isRecording = false;
        };
      }
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.messageForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        content: ['', [Validators.required, Validators.minLength(5)]]
      });
      this.messageService.loadMessages();
    }
  }

  toggleRecording() {
    if (!this.recognition) {
      alert('Trình duyệt của bạn không hỗ trợ chức năng nhận diện giọng nói');
      return;
    }

    if (this.isRecording) {
      this.recognition.stop();
    } else {
      this.isRecording = true;
      this.recognition.start();
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
