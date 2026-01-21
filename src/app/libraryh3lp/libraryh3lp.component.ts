import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  Inject,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-libraryh3lp',
  templateUrl: './libraryh3lp.component.html',
  styleUrls: ['./libraryh3lp.component.scss'],
})
export class Libraryh3lpComponent implements OnInit, OnDestroy, AfterViewInit {
  private showChat = false;
  private chatFrameWrap: HTMLElement | null = null;
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngOnInit() {
    // No initialization needed here
  }
  ngAfterViewInit() {
    this.chatFrameWrap = this.document.getElementById('chat-frame-wrap');
    if (this.chatFrameWrap) {
      this.showChat = false;
      this.chatFrameWrap.style.display = 'none';
    }
    // Load the script (as in your original implementation)
    this.loadScript();
  }
  toggleChat() {
    this.showChat = !this.showChat;
    if (this.chatFrameWrap) {
      this.chatFrameWrap.style.display = this.showChat ? 'block' : 'none';
    }
  }
  loadScript() {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'id', 'localScript');
    this.renderer.setAttribute(
      script,
      'src',
      'https://libraryh3lp.com/js/libraryh3lp.js?19250'
    );
    this.renderer.appendChild(this.document.body, script);
  }
  ngOnDestroy() {
    // Cleanup if needed (not strictly necessary here)
    // For example, if you had any event listeners that need to be removed
  }
}
