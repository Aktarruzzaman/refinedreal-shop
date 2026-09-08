import { Star, StarHalf } from "lucide-react";

export default function StarRating({ rating = 0, reviews, size = 14 }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex items-center text-accent">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`f-${i}`} size={size} fill="currentColor" strokeWidth={0} />
        ))}
        {hasHalf && <StarHalf size={size} fill="currentColor" strokeWidth={0} />}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e-${i}`} size={size} className="text-border" fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      {typeof reviews === "number" && (
        <span className="text-[12.5px] text-muted">({reviews})</span>
      )}
    </div>
  );
}
