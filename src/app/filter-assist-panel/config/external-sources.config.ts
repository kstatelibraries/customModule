import { SearchTarget } from '../models/search-target.model';

/**
 * Helper function to extract and format search queries for external sources
 * Converts Primo query format to simple search terms
 * @param queries Array of Primo-formatted query strings
 * @returns URL-encoded search string
 */
function buildSearchQuery(queries: string[]): string {
  try {
    let fullSearchQuery = '';

    // Process each query element
    queries.forEach((queryElement) => {
      // Primo query format: "field,operator,searchTerm,boolean"
      // Example: "any,contains,test search,AND"

      const firstCommaIndex = queryElement.indexOf(',');
      const secondCommaIndex = queryElement.indexOf(',', firstCommaIndex + 1);
      let searchStr = queryElement.slice(secondCommaIndex + 1);

      // Remove trailing boolean operators (,AND or ,OR)
      if (searchStr.endsWith(',AND') || searchStr.endsWith(',OR')) {
        const finalComma = searchStr.lastIndexOf(',');
        searchStr = searchStr.slice(0, finalComma);
      }

      // Append to full query with space separator
      fullSearchQuery = fullSearchQuery.concat(searchStr + ' ');
    });

    // Trim and encode for URL
    return encodeURIComponent(fullSearchQuery.trim());
  } catch (e) {
    console.error('Error building search query:', e);
    return '';
  }
}

/**
 * Configuration array of external search sources
 * Each source can be clicked from the filter panel to search with current query
 */
export const EXTERNAL_SEARCH_SOURCES: SearchTarget[] = [
  {
    name: 'WorldCat',
    nameHe: 'WorldCat',
    url: 'https://kansasstateuniversity.on.worldcat.org/search?queryString=kw:',
    img: 'assets/images/external-sources/worldcat-logo.png',
    img_2: 'assets/images/external-sources/worldcat-logo.png',
    alt: 'Worldcat',
    mapping: (queries: string[], filters: string[]): string => {
      return buildSearchQuery(queries);
    }
  },
  {
    name: 'Google Scholar',
    nameHe: 'Google Scholar',
    url: 'https://scholar.google.com/scholar?q=',
    img: 'assets/images/external-sources/logo-googlescholar.png',
    img_2: 'assets/images/external-sources/logo-googlescholar.png',
    alt: 'Google Scholar',
    mapping: (queries: string[], filters: string[]): string => {
      return buildSearchQuery(queries);
    }
  },
  {
    name: 'EBSCO',
    nameHe: 'EBSCO',
    url: 'https://research.ebsco.com/c/b2utja/search/results?q=',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/EBSCO_Information_Services_20xx_logo.svg/200px-EBSCO_Information_Services_20xx_logo.svg.png',
    img_2: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/EBSCO_Information_Services_20xx_logo.svg/200px-EBSCO_Information_Services_20xx_logo.svg.png',
    alt: 'EBSCO',
    mapping: (queries: string[], filters: string[]): string => {
      return buildSearchQuery(queries);
    }
  }
  // Crossref is commented out in the original - can be added later if needed
  /*
  {
    name: 'Crossref',
    nameHe: 'Crossref',
    url: 'https://search.crossref.org/?from_ui=yes&q=',
    img: 'assets/images/external-sources/crossref_logo_16_16.png',
    img_2: 'assets/images/external-sources/crossref_logo_16_16.png',
    alt: 'Crossref',
    mapping: (queries: string[], filters: string[]): string => {
      return buildSearchQuery(queries);
    }
  }
  */
];