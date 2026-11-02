import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'nde-request-reorder',
  template: '',
  standalone: true
})
export class NdeRequestReorderComponent implements AfterViewInit, OnDestroy {
  private observer: MutationObserver | null = null;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private scheduled = false;

  ngAfterViewInit(): void {
    // The full-display sections (Requests, View Online, ...) render asynchronously,
    // and this component is hosted in a "before" remote slot that mounts before the
    // View Online section exists. Poll until both sections are present and the
    // reorder succeeds, then keep an observer to re-apply after Angular re-renders.
    this.scheduleReorder();
    this.pollTimer = setInterval(() => {
      if (this.reorderRequestSection()) {
        this.stopPolling();
        this.attachObserver();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.stopPolling();
    this.observer?.disconnect();
    this.observer = null;
  }

  private stopPolling(): void {
    if (this.pollTimer !== null) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  private attachObserver(): void {
    const requestSection = document.querySelector<HTMLElement>('[id="nde.request.title"]');
    const parent = requestSection?.parentElement;
    if (!parent || this.observer) return;

    this.observer = new MutationObserver(() => this.scheduleReorder());
    this.observer.observe(parent, { childList: true });
  }

  private scheduleReorder(): void {
    if (this.scheduled) return;
    this.scheduled = true;
    setTimeout(() => {
      this.scheduled = false;
      this.reorderRequestSection();
    }, 50);
  }

  /**
   * Move the "Requests" section (nde.request.title) to immediately after the
   * "View Online" section (nui.getit.service_viewit).
   * @returns true if both sections exist and the desired order is in place
   * (after performing the move if needed), false otherwise.
   */
  private reorderRequestSection(): boolean {
    const requestSection = document.querySelector<HTMLElement>('[id="nde.request.title"]');
    const viewItSection = document.querySelector<HTMLElement>('[id="nui.getit.service_viewit"]');
    if (!requestSection || !viewItSection) return false;

    const parent = requestSection.parentElement;
    if (!parent || viewItSection.parentElement !== parent) return false;

    // Already in the desired order: no DOM mutation (keeps the observer quiet).
    if (viewItSection.nextElementSibling === requestSection) return true;

    parent.removeChild(requestSection);
    parent.insertBefore(requestSection, viewItSection.nextSibling);
    return true;
  }
}
