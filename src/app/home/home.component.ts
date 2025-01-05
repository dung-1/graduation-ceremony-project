import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject ,ViewEncapsulation} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit, OnDestroy {
  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  private countdownInterval: any;
  private graduationDate = new Date('2025-01-10T14:00:00').getTime();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // Chỉ chạy countdown ở phía client
    if (isPlatformBrowser(this.platformId)) {
      this.startCountdown();
    }
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.graduationDate - now;

    if (distance < 0) {
      clearInterval(this.countdownInterval);
      this.days = '00';
      this.hours = '00';
      this.minutes = '00';
      this.seconds = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Cập nhật UI trong NgZone
    this.ngZone.run(() => {
      this.days = days.toString().padStart(2, '0');
      this.hours = hours.toString().padStart(2, '0');
      this.minutes = minutes.toString().padStart(2, '0');
      this.seconds = seconds.toString().padStart(2, '0');
    });
  }

  startCountdown() {
    // Chạy ngoài NgZone để tránh các vòng lặp change detection không cần thiết
    this.ngZone.runOutsideAngular(() => {
      // Cập nhật lần đầu
      this.updateCountdown();
      
      // Sau đó cập nhật mỗi giây
      this.countdownInterval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    });
  }
}