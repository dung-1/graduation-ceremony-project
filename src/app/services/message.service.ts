import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Message } from '../models/message.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private supabase!: SupabaseClient;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only initialize Supabase in the browser
    if (isPlatformBrowser(this.platformId) && environment.supabaseUrl && environment.supabaseKey) {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
      
      // Register for real-time changes
      this.supabase
        .channel('messages')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
          this.loadMessages();
        })
        .subscribe();

      // Load initial messages
      this.loadMessages();
    } else {
      console.error('Supabase configuration is missing or running on the server');
    }
  }

  async loadMessages() {
    if (!this.supabase) {
      console.error('Supabase client is not initialized');
      return;
    }

    try {
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;

      this.messagesSubject.next(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }

  async sendMessage(message: Omit<Message, 'id' | 'timestamp'>) {
    if (!this.supabase) {
      console.error('Supabase client is not initialized');
      throw new Error('Supabase client is not initialized');
    }

    try {
      const { data, error } = await this.supabase
        .from('messages')
        .insert([message])
        .select();

      if (error) throw error;

      return data[0];
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
