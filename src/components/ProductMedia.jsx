import { useEffect, useRef, useState } from "react";

// Render side labels from the category name, without generated image files.
function CategoryLabel({ label }) {
  const lines = [""];
  for (const word of label.split(/\s+/)) {
    const last = lines.length - 1;
    if (lines[last] && `${lines[last]} ${word}`.length > 10) lines.push(word);
    else lines[last] = `${lines[last]} ${word}`.trim();
  }
  const height = Math.max(280, lines.length * 80 + 40);
  const firstY = height / 2 - ((lines.length - 1) * 80) / 2;
  const longest = Math.max(...lines.map(line => line.length), 1);
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 560 ${height}`} aria-hidden="true">
      <text textAnchor="middle" dominantBaseline="middle" fill="#b0b0b0" fontFamily="Arial, sans-serif" fontSize={Math.min(76, 500 / (longest * 0.65))} fontWeight="900">
        {lines.map((line, index) => <tspan key={index} x="280" y={firstY + index * 80}>{line}</tspan>)}
      </text>
    </svg>
  );
}

export default function ProductMedia({
  label,
  video,
  alt,
  active,
}) {
  const player = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [video]);

  useEffect(() => {
    const videoElement = player.current;
    if (!videoElement) return;

    // Inactive slides never play or download a video.
    if (!active) {
      videoElement.pause();
      videoElement.load();
      return;
    }

    let cancelled = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rectangle = videoElement.getBoundingClientRect();
    let inView = rectangle.bottom > 0 && rectangle.top < window.innerHeight;

    function updatePlayback() {
      if (cancelled) return;
      const shouldPlay = inView && !document.hidden && !preference.matches;

      if (shouldPlay) {
        videoElement.muted = true;
        videoElement
          .play()
          .catch(() => {
            if (!cancelled && inView && !document.hidden) setFailed(true);
          });
      } else {
        videoElement.pause();
      }
    }

    // Pause the video when it leaves the screen or the browser tab is hidden.
    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        updatePlayback();
      },
      { threshold: 0.2 },
    );
    observer.observe(videoElement);
    document.addEventListener("visibilitychange", updatePlayback);
    preference.addEventListener("change", updatePlayback);
    updatePlayback();

    // Cleanup runs when the slide changes or this component is removed.
    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      preference.removeEventListener("change", updatePlayback);
      videoElement.pause();
    };
  }, [active, video]);

  // Play only the centre video; other slides and unavailable clips show a text label.
  const showLabel = !active || !video || failed;

  return (
    <div
      className={`relative h-[29.86cqw] min-h-[325px] w-full shrink-0 select-none max-[1001px]:min-h-[300px] max-[640px]:h-[285px] max-[640px]:min-h-0 ${active ? "product-hover" : "grayscale"}`}
      data-media-state={showLabel ? "label" : "video"}
    >
      {showLabel && <CategoryLabel label={label} />}
      {video && <video
        ref={player}
        className={`absolute inset-0 h-full w-full object-contain ${active ? "animate-[active-media-reveal_0.7s_ease_both]" : ""}`}
        src={active ? video : undefined}
        hidden={showLabel}
        aria-hidden={showLabel}
        aria-label={alt}
        muted
        loop
        playsInline
        preload={active ? "metadata" : "none"}
        onError={() => setFailed(true)}
      />}

    </div>
  );
}
