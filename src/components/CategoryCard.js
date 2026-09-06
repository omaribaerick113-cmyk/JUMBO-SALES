import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-ink-800/10 bg-ink-950 text-white shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl">{category.name}</h3>
        <p className="mt-2 text-sm text-steel-300">{category.description}</p>
        <Link href={`/category/${category.slug}/`} className="btn-primary mt-5 self-start !px-4 !py-2 text-xs">
          View Products
        </Link>
      </div>
    </div>
  );
}
