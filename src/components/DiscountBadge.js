export default function DiscountBadge({ price, previousPrice }) {
  if (!price || !previousPrice || previousPrice <= price) return null;
  const percentOff = Math.round(((previousPrice - price) / previousPrice) * 100);
  if (percentOff <= 0) return null;
  return <span className="badge bg-red-600 text-white">{percentOff}% Off</span>;
}
