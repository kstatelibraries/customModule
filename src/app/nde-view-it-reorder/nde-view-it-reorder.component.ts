import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'nde-view-it-reorder',
  template: '',
  standalone: true
})
export class NdeViewItReorderComponent implements AfterViewInit, OnDestroy {
  private observers: MutationObserver[] = [];
  private scheduled = false;

  ngAfterViewInit(): void {
    // Initial pass after render
    setTimeout(() => this.reorderViewItSections(), 0);
    // Watch only the View It containers, not the whole body
    this.attachObservers();
  }

  ngOnDestroy(): void {
    this.observers.forEach(o => o.disconnect());
  }

  private attachObservers(): void {
    const containers = [
      document.querySelector('[id="nui.getit.service_viewit"]'),
      document.querySelector('nde-view-it')
    ].filter((c): c is HTMLElement => !!c);

    containers.forEach(container => {
      const obs = new MutationObserver(() => this.scheduleReorder());
      obs.observe(container, { childList: true, subtree: false });
      this.observers.push(obs);
    });
  }

  private scheduleReorder(): void {
    if (this.scheduled) return;
    this.scheduled = true;
    setTimeout(() => {
      this.scheduled = false;
      this.reorderViewItSections();
    }, 50);
  }

  private reorderViewItSections(): void {
    const containers = [
      document.querySelector('[id="nui.getit.service_viewit"]'),
      document.querySelector('nde-view-it')
    ].filter((c): c is HTMLElement => !!c);

    for (const container of containers) {
      const sections = Array.from(container.querySelectorAll('nde-view-it-section')) as HTMLElement[];
      if (sections.length < 2) continue;

      const getTitle = (sec: HTMLElement) => sec.querySelector('.view-it-title span')?.textContent?.trim() ?? '';

      const isFullText = (sec: HTMLElement) => {
        const t = getTitle(sec);
        return /viewit\.fulltext/i.test(t) || /full text availability/i.test(t);
      };
      const isGES = (sec: HTMLElement) => {
        const t = getTitle(sec);
        return /c\.uresolver\.GeneralElectronicServices/i.test(t) || /additional services/i.test(t);
      };

      const fullTextSections = sections.filter(isFullText);
      const gesSections = sections.filter(isGES);
      if (!fullTextSections.length || !gesSections.length) continue;

      const lastFullText = fullTextSections[fullTextSections.length - 1];
      const parent = lastFullText.parentNode as HTMLElement | null;
      if (!parent) continue;

      gesSections.forEach(ges => {
        if (!parent.contains(ges)) return;
        if (ges.previousElementSibling === lastFullText) return;
        parent.removeChild(ges);
        parent.insertBefore(ges, lastFullText.nextSibling);
      });
    }
  }
}
