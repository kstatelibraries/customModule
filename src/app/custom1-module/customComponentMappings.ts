import { Libraryh3lpComponent } from '../libraryh3lp/libraryh3lp.component';
import { NdeProblemReportCustom } from '../nde-problem-report-custom/nde-problem-report-custom.component';
import { PayFinesComponent } from '../pay-fines/pay-fines.component';

// Define the map
export const selectorComponentMap = new Map<string, any>([
  ['nde-footer-after', Libraryh3lpComponent],
  ['nde-account-section-results-before', PayFinesComponent],
  ['nde-full-display-service-container-after', NdeProblemReportCustom],
]);
