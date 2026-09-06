import { getPageContent } from '@/lib/content';
import LegalPageBody from '@/components/LegalPageBody';
export const metadata = { title: 'Delivery Policy' };
export default function DeliveryPolicyPage() {
  return <LegalPageBody page={getPageContent('delivery-policy')} />;
}
