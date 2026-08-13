import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'custom-pickup-filter',
  standalone: true,
  template: '',
})
export class PickupFilterComponent implements OnInit, OnDestroy {
  @Input() private hostComponent!: any;

  private readonly HIDE_TEXT = ['Archives and Special Collections Library'];
  private intervalId: any = null;
  private observer: MutationObserver | null = null;

  ngOnInit(): void {
    const hideOptions = () => {
      const opts = document.querySelectorAll(
        'mat-option, .mat-mdc-option'
      ) as NodeListOf<HTMLElement>;
      opts.forEach((opt) => {
        const txt = opt.innerText?.trim() ?? '';
        if (this.HIDE_TEXT.some((t) => txt.includes(t))) {
          opt.style.display = 'none';
          opt.setAttribute('aria-hidden', 'true');
        }
      });
    };

    const input = document.querySelector<HTMLInputElement>(
      '[data-qa="almaRequest.pickupLocation"] input'
    );
    if (input) {
      input.addEventListener('focus', hideOptions);
      input.addEventListener('input', hideOptions);

      this.observer = new MutationObserver(hideOptions);
      this.observer.observe(document.body, { childList: true, subtree: true });
    }

    this.intervalId = setInterval(hideOptions, 400);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.observer?.disconnect();
  }
}
