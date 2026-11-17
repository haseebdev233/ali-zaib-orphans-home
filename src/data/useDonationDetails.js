import { donationDetails } from './donationDetails';
import { usePageContent } from './usePageContent';

export function useDonationDetails() {
  return usePageContent('donate', donationDetails);
}
