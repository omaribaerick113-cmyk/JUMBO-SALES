import { getPageContent } from '@/lib/content';
import LegalPageBody from '@/components/LegalPageBody';
export const metadata = { title: 'Terms & Conditions' };
export default function TermsPage() {
  return <LegalPageBody page={getPageContent('terms')} />;
}
