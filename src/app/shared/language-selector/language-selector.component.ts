import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  name: string;
  flag: string;
}


@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})

export class LanguageSelectorComponent {
  languages: Language[] = [
    { code: 'en', name: 'English', flag: 'assets/flag/en.png' },
    { code: 'vi', name: 'VietNamese', flag: 'assets/flag/vn.png' },
    { code: 'ja', name: '日本語', flag: 'assets/flag/jp.png' }
  ];

  selectedLanguage: Language = { code: 'vi', name: 'Tiếng Việt', flag: 'assets/flag/vi.png' };

  constructor(private translate: TranslateService) {
    // Get current language or set default
    const currentLang = this.translate.currentLang || 'vi';
    this.selectedLanguage = this.languages.find(lang => lang.code === currentLang) || this.languages[1];
  }

  changeLanguage(lang: Language) {
    this.selectedLanguage = lang;
    this.translate.use(lang.code);
  }
}