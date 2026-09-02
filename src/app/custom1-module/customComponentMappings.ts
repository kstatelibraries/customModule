import { LibraryAlertsPannelComponent } from '../library-alerts-pannel/library-alerts-pannel.component';
import { Libraryh3lpComponent } from '../libraryh3lp/libraryh3lp.component';
import { NdeProblemReportCustom } from '../nde-problem-report-custom/nde-problem-report-custom.component';
import { PayFinesComponent } from '../pay-fines/pay-fines.component';
import { TrafficResultLimitComponent } from '../traffic-result-limit/traffic-result-limit.component';
import { PickupFilterComponent } from '../pickup-filter/pickup-filter.component';

// Define the map
export const selectorComponentMap = new Map<string, any>([
  ['nde-user-area-after', Libraryh3lpComponent],
  ['nde-fines-before', PayFinesComponent],
  ['nde-full-display-service-container-after', NdeProblemReportCustom],
  ['nde-top-bar-after', LibraryAlertsPannelComponent],
  ['nde-search-no-results-before', TrafficResultLimitComponent],
  ['nde-formly-general-wrapper-bottom', PickupFilterComponent],
]);
