import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'custom-report-a-problem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nde-problem-report-custom.component.html',
  styleUrl: './nde-problem-report-custom.component.scss',
})
export class NdeProblemReportCustom implements OnInit {
  @Input() private hostComponent!: any;

  reportUrl: string = '';
  shouldDisplay: boolean = false;

  private formBaseUrl =
    'https://kstate.qualtrics.com/jfe/form/SV_eROZUNQFDEk8jsO';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.shouldDisplay = this.isInDetailsContainer();

    if (this.shouldDisplay) {
      this.buildReportUrl();
    }
  }

  private isInDetailsContainer(): boolean {
    try {
      const element = this.elementRef.nativeElement;
      const parentContainer = element.closest(
        '[id="brief.results.tabs.details"]'
      );
      return !!parentContainer;
    } catch (error) {
      console.error('Error checking container:', error);
      return false;
    }
  }

  private buildReportUrl() {
    try {
      const pnx = this.hostComponent?.searchResult?.pnx;
      const genre = pnx?.addata?.genre?.[0] || '';
      const format = pnx?.addata?.format?.[0] || '';
      const jtitle = pnx?.addata?.jtitle?.[0] || '';
      const atitle = pnx?.addata?.atitle?.[0] || '';
      const identifier = pnx?.display?.identifier?.[0] || '';
      const recordid = pnx?.control?.recordid?.[0] || '';
      const currentUrl = window.location.href;

      const params = new URLSearchParams({
        genre: genre,
        format: format,
        jtitle: jtitle,
        atitle: atitle,
        identifier: identifier,
        recordid: recordid,
        currentUrl: currentUrl,
      });

      this.reportUrl = `${this.formBaseUrl}?${params.toString()}`;
    } catch (error) {
      console.error('Error building report URL:', error);
      this.reportUrl = this.formBaseUrl;
    }
  }
}
