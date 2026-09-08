import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MixpanelService } from '../services/mixpanel.service';

@Component({
  selector: 'library-alerts-pannel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-alerts-pannel.component.html',
  styleUrls: ['./library-alerts-pannel.component.scss'],
})
export class LibraryAlertsPannelComponent implements OnInit {
  showAlertInfo = false;
  showAlertEmergency = false;

  infoMessage: SafeHtml = '';
  emergencyMessage: SafeHtml = '';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private mixpanel: MixpanelService
  ) {}

  ngOnInit(): void {
    this.getAlerts();
  }

  private getAlerts(): void {
    this.http
      .get<any>('https://tools.lib.k-state.edu/data/website_alerts/')
      .subscribe({
        next: (data) => {
          this.showAlertInfo = data?.informational?.active === true;
          this.showAlertEmergency = data?.emergency?.active === true;

          if (this.showAlertInfo) {
            this.mixpanel.track('Library Alert Displayed', {
              alert_type: 'informational',
              severity: data?.informational?.severity || 'info',
              message_length: data?.informational?.message?.length || 0,
            });
          }

          if (this.showAlertEmergency) {
            this.mixpanel.track('Library Alert Displayed', {
              alert_type: 'emergency',
              severity: data?.emergency?.severity || 'high',
              message_length: data?.emergency?.message?.length || 0,
            });
          }

          this.infoMessage = this.sanitizer.bypassSecurityTrustHtml(
            this.decodeHtmlEntitiesDeep(data?.informational?.message)
          );

          this.emergencyMessage = this.sanitizer.bypassSecurityTrustHtml(
            this.decodeHtmlEntitiesDeep(data?.emergency?.message)
          );
        },
        error: (err) => {
          console.error('Error fetching alerts:', err);
        },
      });
  }

  closeAlert(type: 'info' | 'emergency'): void {
    if (type === 'info') {
      this.showAlertInfo = false;
      this.mixpanel.track('Library Alert Dismissed', {
        alert_type: 'informational'
      });
    }

    if (type === 'emergency') {
      this.showAlertEmergency = false;
      this.mixpanel.track('Library Alert Dismissed', {
        alert_type: 'emergency'
      });
    }
  }

  private decodeHtmlEntitiesDeep(str?: string): string {
    if (!str) return '';

    let previous: string;
    let current = str;

    do {
      previous = current;
      const textarea = document.createElement('textarea');
      textarea.innerHTML = current;
      current = textarea.value;
    } while (current !== previous);

    return current;
  }
}
