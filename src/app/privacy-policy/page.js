import { getPageContent } from '@/lib/content';
import LegalPageBody from '@/components/LegalPageBody';
export const metadata = { title: 'Privacy Policy' };
export default function PrivacyPolicyPage() {
  return <LegalPageBody page={getPageContent('privacy-policy')} />;
}
