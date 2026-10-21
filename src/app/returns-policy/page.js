import { getPageContent } from '@/lib/content';
import LegalPageBody from '@/components/LegalPageBody';
export const metadata = { title: 'Returns & Refunds' };
export default function ReturnsPolicyPage() {
  return <LegalPageBody page={getPageContent('returns-policy')} />;
}
