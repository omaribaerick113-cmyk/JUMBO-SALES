import { getPageContent } from '@/lib/content';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about Jumbo Sales, hardware and construction materials supplier in Kenya.',
};

export default function AboutPage() {
  const page = getPageContent('about') || {};
  const sections = [
    { title: 'Who We Are', body: page.whoWeAre },
    { title: 'What We Supply', body: page.whatWeSupply },
    { title: 'Why Choose Us', body: page.whyChooseUs },
    { title: 'Our Mission', body: page.mission },
    { title: 'Our Vision', body: page.vision },
  ].filter((s) => s.body);

  return (
    <div className="container-x max-w-3xl py-12">
      <h1 className="font-display text-3xl text-ink-950">About Jumbo Sales</h1>
      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-lg text-rust-600">{s.title}</h2>
            <p className="mt-2 text-steel-700">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
