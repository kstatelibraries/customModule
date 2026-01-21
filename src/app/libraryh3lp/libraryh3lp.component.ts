import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-libraryh3lp',
  styleUrl: './libraryh3lp.component.scss',
  template: '',
})
export class Libraryh3lpComponent implements OnInit, OnDestroy {
  private showChat = false;
  private chatFrameWrap: HTMLElement | null = null;
  private unlistenFunctions: (() => void)[] = [];

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    // Check if component already exists to prevent duplicate initialization
    if (this.document.getElementById('chat-frame-wrap')) {
      return;
    }

    // Create needsJs element
    const needsJs = this.renderer.createElement('div');
    this.renderer.addClass(needsJs, 'needs-js');

    // Create close button with style
    const closeChatButton = this.renderer.createElement('button');
    this.renderer.setProperty(closeChatButton, 'innerHTML', '☓');
    this.renderer.setAttribute(
      closeChatButton,
      'style',
      'border: 0 none; background: #f5f7fa; font-size: 16px; position: absolute; padding: 5px; right: -5px; top: -15px; border-radius: 50%; width: 30px; font-weight: bold;'
    );

    // Create chat frame with style
    this.chatFrameWrap = this.renderer.createElement('div');
    this.renderer.setAttribute(this.chatFrameWrap, 'id', 'chat-frame-wrap');
    this.renderer.setAttribute(
      this.chatFrameWrap,
      'style',
      'display: none; width: 280px; background-color: #f5f5f5; padding: 0; box-shadow: -5px -5px 20px 5px rgba(0, 0, 0, 0.3); position: fixed; bottom: 0; right: 10px; border: 0 none; z-index: 200;'
    );

    // Append elements to chat frame
    this.renderer.appendChild(this.chatFrameWrap, closeChatButton);
    this.renderer.appendChild(this.chatFrameWrap, needsJs);

    // Create chat button
    const chatButton = this.renderer.createElement('button');
    this.renderer.setProperty(chatButton, 'innerHTML', 'Chat');
    this.renderer.addClass(chatButton, 'h3lp');
    this.renderer.setStyle(chatButton, 'transform', 'rotate(90deg)');

    // Event handler for toggle logic
    const toggleChat = () => {
      if (this.chatFrameWrap) {
        this.chatFrameWrap.style.display = this.showChat ? 'none' : 'block';
        this.showChat = !this.showChat;
      }
    };

    // Register event listeners and track them for cleanup
    this.unlistenFunctions.push(
      this.renderer.listen(closeChatButton, 'click', toggleChat),
      this.renderer.listen(closeChatButton, 'touchend', toggleChat),
      this.renderer.listen(chatButton, 'click', toggleChat),
      this.renderer.listen(chatButton, 'touchend', toggleChat)
    );

    // Create chat container
    const chatWidget = this.renderer.createElement('aside');
    this.renderer.setAttribute(chatWidget, 'tabindex', '-1');
    this.renderer.setAttribute(chatWidget, 'style', 'display: block;');
    this.renderer.appendChild(chatWidget, chatButton);
    this.renderer.appendChild(chatWidget, this.chatFrameWrap);

    // Append to body
    this.renderer.appendChild(this.document.body, chatWidget);

    // Create and append script
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'id', 'localScript');
    this.renderer.setAttribute(script, 'src', 'https://libraryh3lp.com/js/libraryh3lp.js?19250');
    this.renderer.appendChild(this.document.body, script);
  }

  ngOnDestroy() {
    // Clean up event listeners to prevent memory leaks
    for (const unlisten of this.unlistenFunctions) {
      unlisten();
    }
    this.unlistenFunctions = [];
  }
}