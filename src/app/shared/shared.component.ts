import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent {
  // Định nghĩa mảng các route theo thứ tự
  routes = [
    { path: '/home', label: 'Trang chủ' },
    { path: '/event', label: 'Sự kiện' },
    { path: '/messages', label: 'Tin chúc mừng' },
    { path: '/money', label: 'Mừng tốt nghiệp' }
  ];

  constructor(private router: Router) {}

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
}
