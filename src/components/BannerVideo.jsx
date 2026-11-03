import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function BannerVideo({ id, src, poster, alt, width, height, className, controlClassName }) {
  const player = useRef(null);
  const choice = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = player.current;
    if (!video || failed) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rect = video.getBoundingClientRect();
    let visible = rect.bottom > 0 && rect.top < window.innerHeight;
    let disposed = false;

    function updatePlayback() {
      if (disposed) return;
      const requested = choice.current === "play" ||
        (choice.current === null && !preference.matches);
      if (visible && !document.hidden && requested) {
        video.muted = true;
        // If autoplay is blocked, the visitor can use the play button.
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      updatePlayback();
    }, { threshold: 0.15 });
    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    preference.addEventListener("change", updatePlayback);
    updatePlayback();

    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      preference.removeEventListener("change", updatePlayback);
      video.pause();
    };
  }, [failed]);

  function togglePlayback() {
    const video = player.current;
    if (!video) return;
    if (video.paused) {
      choice.current = "play";
      video.play().catch(() => {});
    } else {
      choice.current = "pause";
      video.pause();
    }
  }

  return (
    <>
      {failed ? (
        <img
          src={poster}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      ) : (
        <>
          <video
            id={id}
            ref={player}
            src={src}
            poster={poster}
            width={width}
            height={height}
            className={className}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={alt}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
          />
          <button
            type="button"
            onClick={togglePlayback}
            aria-controls={id}
            aria-label={playing ? "Pause banner video" : "Play banner video"}
            title={playing ? "Pause video" : "Play video"}
            className={controlClassName ?? "absolute left-1/2 top-[49%] z-10 flex size-[clamp(46px,5cqw,80px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/10 text-white transition-colors hover:bg-black/30 focus-visible:bg-black/30 max-[640px]:top-[48%]"}
          >
            {playing ? (
              <Pause className="size-1/2" fill="currentColor" aria-hidden="true" />
            ) : (
              <Play className="ml-[3px] size-1/2" fill="currentColor" aria-hidden="true" />
            )}
          </button>
        </>
      )}
    </>
  );
}
