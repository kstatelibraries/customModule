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

  private formBaseUrl = 'https://kstate.qualtrics.com/jfe/form/SV_9XleO386qJUJrOm?rft.genre={rft.genre}&rft.object_type={rft.object_type}&rft.stitle={rft.stitle}&rft.title={rft.title}&rft.epage={rft.epage}&rft.volume={rft.volume}&rft.issue_start={rft.issue_start}&rft.year={rft.year}&rft.issn={rft.issn}&rft.isbn={rft.isbn}&rft.mms_id={rft.mms_id}&rft.atitle={rft.atitle}&rft.jtitle={rft.jtitle}&rft.btitle={rft.btitle}&rft.issue={rft.issue}&url=';

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
        '[id="nui.getit.service_viewit"]'
      );
      return !!parentContainer;
    } catch (error) {
      console.error('Error checking container:', error);
      return false;
    }
  }
// The Qualtrics OpenURL is not working the same as GES.  But, becasue there is direct access to the PNX, we can rebuild the Qualtrics OpenURL to fill in data from the PNX record in addtion to capturing the Primo VE URL.
// Instead of using the PNX, look into how the CTO can be used: `&displayCTO=true`
  private buildReportUrl() {
    try {
      // const pnx = this.hostComponent?.searchResult?.pnx;
      // const openURLTitle = pnx?.display?.title?.[0] || '';
      const currentUrl = window.location.href;

      // const params = new URLSearchParams({
      //   '2': currentUrl,
      //   '1': openURLTitle,
      // });

      // this.reportUrl = `${this.formBaseUrl}?${params.toString()}`;
      this.reportUrl = `${this.formBaseUrl}${currentUrl}`;
    } catch (error) {
      console.error('Error building report URL:', error);
      this.reportUrl = this.formBaseUrl;
    }
  }
}
