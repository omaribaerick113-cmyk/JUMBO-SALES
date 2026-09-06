const STYLES = {
  available: 'bg-green-700/90 text-white',
  out_of_stock: 'bg-rust-600 text-white',
  sold: 'bg-ink-700 text-steel-300',
};
const LABELS = { available: 'Available', out_of_stock: 'Out of Stock', sold: 'Sold' };

export default function AvailabilityBadge({ availability }) {
  const status = availability || 'available';
  return <span className={`badge ${STYLES[status] || STYLES.available}`}>{LABELS[status] || 'Available'}</span>;
}
