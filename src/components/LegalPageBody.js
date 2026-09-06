export default function LegalPageBody({ page }) {
  if (!page) return null;
  const paragraphs = page.body.split('\n\n');
  return (
    <div className="container-x max-w-3xl py-12">
      <h1 className="font-display text-3xl text-ink-950">{page.title}</h1>
      {page.updated ? <p className="mt-2 text-sm text-steel-500">Last updated: {page.updated}</p> : null}
      <div className="prose mt-6 max-w-none space-y-4 text-steel-700">
        {paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
      </div>
    </div>
  );
}
