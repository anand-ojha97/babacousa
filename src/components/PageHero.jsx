import BannerVideo from "./BannerVideo.jsx";

// Shared banner used by six inner pages. Each page supplies its own image,
// title, and layout classes, so its approved design stays exactly the same.
// "image" is an object of image details; other props are simple text values.
export default function PageHero({
  id,
  title,
  image,
  video,
  className,
  overlayClassName,
  titleClassName,
}) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={className}>
      {video ? <BannerVideo
        id={`${id}-video`}
        src={video.src}
        poster={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className={image.className}
        controlClassName={video.controlClassName}
      /> : <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        fetchPriority="high"
        className={image.className}
      />}
      <div className={`pointer-events-none ${overlayClassName}`} aria-hidden="true" />
      <h1 id={titleId} className={titleClassName}>{title}</h1>
    </section>
  );
}
