import ProductMedia from "./ProductMedia.jsx";

export default function CategorySlide({
  category,
  brandName,
  active,
  index,
  total,
  position,
  onSelect,
}) {
  return (
    <div
      className={`orbit-slide absolute left-1/2 top-0 flex h-full w-[38%] flex-col items-center justify-start pt-[0.95cqw] max-[1001px]:pt-3 max-[640px]:w-[58%] max-[640px]:pt-5 ${active ? "z-10" : "z-0 hover:opacity-60"}`}
      style={{
        "--orbit-x": position.x,
        "--orbit-y": position.y,
        "--orbit-scale": position.scale,
        "--orbit-opacity": position.opacity,
      }}
      aria-hidden={!active || undefined}
      role={active ? "group" : undefined}
      aria-roledescription={active ? "slide" : undefined}
      aria-label={
        active ? `${index + 1} of ${total}: ${category.label}` : undefined
      }
    >
      <ProductMedia
        video={category.video}
        label={category.label}
        alt={`${brandName} ${category.label} category preview`}
        active={active}
      />
      {!active && (
        <button
          className="absolute inset-0 h-full w-full border-0 bg-transparent"
          tabIndex={-1}
          aria-label={`Show ${category.label} category`}
          onClick={onSelect}
        />
      )}
    </div>
  );
}
