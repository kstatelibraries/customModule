import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MixpanelService {
  private initialized = false;
  private pageStartTime = Date.now();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  init(projectToken: string) {
    if (!this.initialized) {
      mixpanel.init(projectToken, { debug: false, autocapture: false });
      mixpanel.register({
        vid: this.getVid(),
        library: 'Kansas State',
        user_type: this.getUserType()
      });
      this.initialized = true;
    }
  }

  track(eventName: string, properties: Record<string, any> = {}) {
    const mp = (window as any).mixpanel ?? mixpanel;
    if (!mp?.track) return;

    const enriched = {
      ...properties,
      page: this.document.location.pathname,
      page_url: this.document.location.href,
      referrer: this.document.referrer,
      timestamp: new Date().toISOString(),
      time_on_page_ms: Date.now() - this.pageStartTime,
      vid: this.getVid(),
      user_type: this.getUserType()
    };

    mp.track(eventName, enriched);
  }

  private getVid(): string {
    const params = new URLSearchParams(this.document.location.search);
    return params.get('vid') ?? 'UNKNOWN';
  }

  private getUserType(): string {
    // Replace with real check from your store / auth service
    return 'anonymous';
  }
}
