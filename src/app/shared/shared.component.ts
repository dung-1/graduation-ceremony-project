import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  private fireworkAudio: HTMLAudioElement;
  isPlaying: boolean = false;
  showEffects: boolean = false;

  // Định nghĩa mảng các route theo thứ tự
  routes = [
    { path: '/home', label: 'Trang chủ' },
    { path: '/event', label: 'Sự kiện' },
    { path: '/messages', label: 'Tin chúc mừng' },
    { path: '/money', label: 'Mừng tốt nghiệp' }
  ];

  constructor(private router: Router) {
    // Khởi tạo audio trong constructor
    this.fireworkAudio = new Audio('assets/Tiengphaohoa.mp3');
    this.fireworkAudio.load();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Lấy index của trang hiện tại
  getCurrentPageIndex(): number {
    const currentPath = this.router.url;
    return this.routes.findIndex(route => route.path === currentPath);
  }

  // Điều hướng đến trang trước
  prevPage() {
    const currentIndex = this.getCurrentPageIndex();
    if (currentIndex > 0) {
      this.router.navigate([this.routes[currentIndex - 1].path]);
    }
  }

  // Điều hướng đến trang tiếp theo
  nextPage() {
    const currentIndex = this.getCurrentPageIndex();
    if (currentIndex < this.routes.length - 1) {
      this.router.navigate([this.routes[currentIndex + 1].path]);
    }
  }

  // Kiểm tra xem có thể prev không
  canPrev(): boolean {
    return this.getCurrentPageIndex() > 0;
  }

  // Kiểm tra xem có thể next không
  canNext(): boolean {
    return this.getCurrentPageIndex() < this.routes.length - 1;
  }

  toggleMusic() {
    const audio = this.audioPlayer?.nativeElement;
    if (audio) {
      try {
        if (this.isPlaying) {
          audio.pause();
        } else {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Audio playback error:", error);
            });
          }
        }
        this.isPlaying = !this.isPlaying;
      } catch (error) {
        console.error('Error toggling music:', error);
      }
    }
  }

  toggleEffects() {
    this.showEffects = !this.showEffects;
    if (this.showEffects) {
      this.playFireworkSound();
    } else {
      this.stopFireworkSound();
    }
  }

  playFireworkSound() {
    try {
      if (this.fireworkAudio) {
        this.fireworkAudio.currentTime = 0;
        this.fireworkAudio.loop = true;
        const playPromise = this.fireworkAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Firework sound error:', error);
          });
        }
      }
    } catch (error) {
      console.error('Error playing firework sound:', error);
    }
  }

  stopFireworkSound() {
    try {
      if (this.fireworkAudio) {
        this.fireworkAudio.pause();
        this.fireworkAudio.currentTime = 0;
        this.fireworkAudio.loop = false;
      }
    } catch (error) {
      console.error('Error stopping firework sound:', error);
    }
  }

  ngAfterViewInit() {
    // Set volume for background music
    if (this.audioPlayer?.nativeElement) {
      this.audioPlayer.nativeElement.volume = 0.5;
    }
    // Set volume for firework sound
    if (this.fireworkAudio) {
      this.fireworkAudio.volume = 0.3;
    }
  }

  ngOnDestroy() {
    try {
      if (this.fireworkAudio) {
        this.fireworkAudio.pause();
        this.fireworkAudio.currentTime = 0;
      }
    } catch (error) {
      console.error('Error in cleanup:', error);
    }
  }
}
